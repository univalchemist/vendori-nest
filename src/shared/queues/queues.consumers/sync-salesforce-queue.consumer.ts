import { Inject, Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Repository } from 'typeorm';
import * as moment from 'moment-timezone';
import { InjectRepository } from '@nestjs/typeorm';

import { OemQuoteEntity } from '../../../oem/main/oem-quotes/oem-quote.entity';
import { OemProductEntity } from '../../../oem/main/oem-products/oem-product.entity';
import { OemCustomersProducts } from '../../../oem/intermediaries/_oem-customers-products/oem-customers-products.entity';
import { OemQuotesUsers } from '../../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import * as _ from 'lodash';
import { SalesforceConnectionService } from '../../salesforce/salesforce-connection/salesforce-connection.service';

import { JobNames, QueueNames } from '../queues.enums/queue-enum';

import { SalesforceSyncService } from '../../salesforce/salesforce-sync.service';

import * as SFFieldMappingUtil from '../../salesforce/salesforce.utils/field-mapping.salesforce.util';
import * as jsforce from 'jsforce';

@Processor(QueueNames.SyncSalesForce)
export class SyncSalesForceQueueConsumer {
  private readonly logger = new Logger(SyncSalesForceQueueConsumer.name);

  constructor(
    // Need a transformer/integration module to separate the logic. @saleforce_sync
    // We should not call any of these repos - only the integration module. @saleforce_sync
    // An integration module with everything in one place allows you make changes without refactoring the module. @saleforce_sync
    // The integration module should include transformer + imported Salesforce service @saleforce_sync
    @InjectRepository(OemQuoteEntity)
    private readonly quoteRepo: Repository<OemQuoteEntity>,
    @InjectRepository(OemProductEntity)
    private readonly productRepo: Repository<OemProductEntity>,
    @InjectRepository(OemQuotesUsers)
    private readonly quoteUserRepo: Repository<OemQuotesUsers>,
    @InjectRepository(OemCustomersProducts)
    private readonly customerProductRepo: Repository<OemCustomersProducts>,
    private salesforceService: SalesforceSyncService,
    @Inject(SalesforceConnectionService)
    private salesforceConnectionService: SalesforceConnectionService,
  ) {}

  @Process(JobNames.BatchSyncQuotesToSF)
  async batchSyncQuoteSFs(job: Job) {
    await job.progress(0);

    const compareTime = moment.utc().subtract(1, 'days').toDate();
    this.logger.log(`compareTime is ${compareTime}`);

    try {
      //Initialize connections
      await this.salesforceConnectionService.initConnections();
      const quotesToSync = await this.quoteRepo
        .createQueryBuilder('quotes')
        .where(
          '(quotes.updatedAt > :compareTime OR quotes.createdAt > :compareTime)',
          { compareTime },
        )
        .leftJoinAndSelect('quotes.ownerUser', 'user')
        .leftJoinAndSelect('quotes.customer', 'customer')
        .leftJoinAndSelect('customer.customerAddresses', 'customerAddresses')
        .leftJoinAndSelect('customerAddresses.address', 'address')
        .leftJoinAndSelect('quotes.quotesProducts', 'quotesProducts')
        .leftJoinAndSelect('quotesProducts.product', 'product')
        .leftJoinAndSelect('product.pricingModel', 'pricingModel')
        .getMany();

      const quotesUsers = await this.quoteUserRepo
        .createQueryBuilder('usersQuotes')
        .where('usersQuotes.updatedAt > :compareTime', {
          compareTime: compareTime,
        })
        .leftJoinAndSelect('usersQuotes.quote', 'quote')
        .leftJoinAndSelect('usersQuotes.user', 'user')
        .getMany();

      // console.log('quotesToSync: ', quotesToSync.length, quotesToSync);

      const groupedQuotes = _.groupBy(
        quotesToSync.filter((q) => q.quotesProducts.length > 0),
        'companyId',
      );

      _.forEach(groupedQuotes, async (quotesGroup, companyId) => {
        try {
          const upsertBody = await SFFieldMappingUtil.quoteFieldMapping(
            quotesGroup,
          );

          await this.salesforceService.batchSyncQuoteSF(
            quotesGroup,
            upsertBody,
            Number(companyId),
          );
        } catch (error) {
          throw error;
        }
      });

      const groupedQuotesContacts = _.groupBy(quotesUsers, 'companyId');

      _.forEach(
        groupedQuotesContacts,
        async (quotesContactsGroup, companyId) => {
          try {
            await this.salesforceService.batchSyncQuoteContactSF(
              quotesContactsGroup,
              Number(companyId),
            );
          } catch (error) {
            throw error;
          }
        },
      );

      await job.progress(100);
    } catch (error) {
      console.error({
        func: `${JobNames.BatchSyncQuotesToSF}/process`,
        error,
      });

      throw error;
    }
  }

  @Process(JobNames.RealTimeSyncQuoteToSF)
  async realTimeSyncQuote(job: Job) {
    await job.progress(0);
    await this.salesforceConnectionService.initConnections();
    try {
      const quote = await this.quoteRepo
        .createQueryBuilder('quotes')
        .where('quotes.quoteId = :quoteId', {
          quoteId:
            job.data.payload?.quoteId || job.data.id || job.data.payload?.id,
        })
        .leftJoinAndSelect('quotes.ownerUser', 'user')
        .leftJoinAndSelect('quotes.customer', 'customer')
        .leftJoinAndSelect('customer.customerAddresses', 'customerAddresses')
        .leftJoinAndSelect('customerAddresses.address', 'address')
        .leftJoinAndSelect('quotes.quotesProducts', 'quotesProducts')
        .leftJoinAndSelect('quotesProducts.product', 'product')
        .leftJoinAndSelect('product.pricingModel', 'pricingModel')
        .getOne();

      this.logger.log(
        `realTimeSyncQuote > quote.isPrimary > ${quote.quoteId}`,
        quote?.isPrimary,
      );

      // TODO
      // Call transformer service to transform vendori quote to SF data before calling SF service.

      await this.salesforceService.realTimeSyncQuote(quote);

      await job.progress(100);
    } catch (error) {
      this.logger.error({
        func: `${JobNames.RealTimeSyncQuoteToSF}/process`,
        stack: error.stack,
        error,
      });

      throw error;
    }
  }

  @Process(JobNames.CreateAssetToSF)
  async createAssetToSF(job: Job) {
    await job.progress(0);
    try {
      await this.salesforceConnectionService.initConnections();
      const quote = await this.quoteRepo
        .createQueryBuilder('quotes')
        .where('quotes.quoteId = :quoteId', { quoteId: job.data.id })
        .leftJoinAndSelect('quotes.customer', 'customer')
        .leftJoinAndSelect('quotes.quotesProducts', 'quotesProducts')
        .leftJoinAndSelect('quotesProducts.product', 'product')
        .leftJoinAndSelect('quotesProducts.bundle', 'bundle')
        .leftJoinAndSelect('product.pricingModel', 'pricingModel')
        .getOne();
      const assetsBody: any[] = [];
      // TODO
      // Call transformer service to transform vendori quote to SF data before calling SF service.
      for (const quoteProduct of quote.quotesProducts) {
        const body = {
          productId: quoteProduct.productId,
          bundleId: quoteProduct.bundleId,
          customerId: quote.customerId,
          companyId: quote.companyId,
          quantity: quoteProduct.quantity,
          endDate: quoteProduct.endDate,
          customerPrice: 0,
          netPrice: 0,
        };
        const res = await this.customerProductRepo.insert(body);
        const customerProductId = res.identifiers[0]['customerProductId'];

        // If product is bundled, need to create parent asset with this bundle
        let parentAssetId = '';
        if (quoteProduct.bundleId && quoteProduct.bundle.sfProductId) {
          const assetBody = SFFieldMappingUtil.assetFieldMapping(
            quote,
            quoteProduct,
            customerProductId,
            true,
            null,
          );

          const res = await this.salesforceService.createAssetSF(
            assetBody,
            quoteProduct.companyId,
          );

          parentAssetId = res['id'];
          await this.customerProductRepo.update(customerProductId, {
            sfParentAssetId: parentAssetId,
          });
        }

        if (quoteProduct.product.sfProductId) {
          const assetBody = SFFieldMappingUtil.assetFieldMapping(
            quote,
            quoteProduct,
            customerProductId,
            false,
            parentAssetId,
          );
          assetsBody.push(assetBody);
        }
      }

      await this.salesforceService.createMultipleAssetsSF(
        assetsBody,
        quote.companyId,
      );

      await job.progress(100);
    } catch (error) {
      this.logger.error({
        func: `${JobNames.CreateAssetToSF}/process`,
        stack: error.stack,
        error,
      });

      throw error;
    }
  }

  @Process(JobNames.BatchSyncAssetsToDB)
  async syncAssetsToDB() {
    try {
      await this.salesforceConnectionService.initConnections();
      const connections = this.salesforceConnectionService.getAllConnections();

      for (const conn of connections) {
        const query = `SELECT Id, List_Price__c, Price, Vendori_Asset_Id__c, Quantity, End_Date__c, Product2.Vendori_Product__c, Account.Vendori_Customer_Id__c, Parent.Vendori_Asset_Id__c FROM Asset WHERE CreatedDate >= ${jsforce.Date.YESTERDAY}`;
        const assets: Array<any> = (await conn.connection.query(query)).records;

        const unsyncedAssets = assets.filter(
          (asset) =>
            asset.Vendori_Asset_Id__c === null &&
            asset.Product2 !== null &&
            asset.End_Date__c !== null &&
            asset.Account !== null,
        );

        console.log('[Salesforce] unsyncedAssets', unsyncedAssets);

        this.salesforceService.customerProductsSync(unsyncedAssets, conn);
      }
    } catch (error) {
      throw error;
    }
  }

  @Process(JobNames.RealTimeSyncProductToSF)
  async syncProductRealTimeSF(job: Job) {
    await job.progress(0);
    await this.salesforceConnectionService.initConnections();

    try {
      const product = await this.productRepo
        .createQueryBuilder('product')
        .where('product.productId = :productId', {
          productId:
            job.data.payload?.productId || job.data.payload?.id || job.data.id,
        })
        .leftJoinAndSelect('product.pricingModel', 'pricingModel')
        .leftJoinAndSelect('product.productHierarchy', 'productHierarchy')
        .leftJoinAndSelect('productHierarchy.hierarchyLevel', 'hierarchyLevel')
        .getOne();

      this.logger.log(
        `syncProductRealTimeSF > product > #${product?.productId}`,
      );

      // TODO
      // Call transformer service to transform vendori quote to SF data before calling SF service.
      if (product) {
        await this.salesforceService.syncProductRealTimeSF(
          product,
          job.data.deleted,
        );
      }

      await job.progress(100);
    } catch (error) {
      this.logger.error({
        func: `${JobNames.RealTimeSyncProductToSF}/process`,
        stack: error.stack,
        error,
      });

      throw error;
    }
  }
}
