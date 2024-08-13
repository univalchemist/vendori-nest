import { BulkOptions } from 'jsforce';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import * as _ from 'lodash';

import { OpportunityAccountGetDto } from './salesforce.dto/opportunity-account.dto';
import {
  OemQuoteEntity,
  Quote,
} from '../../oem/main/oem-quotes/oem-quote.entity';
import { OemQuotesProducts } from '../../oem/intermediaries/_oem-quotes-products/oem-quotes-products.entity';
import * as SFFieldMappingUtil from './salesforce.utils/field-mapping.salesforce.util';
import { OemProductEntity } from '../../oem/main/oem-products/oem-product.entity';
import { OemSalesforceIntegrationEntity } from '../../oem/main/oem-integrations/oem-salesforce-integrations/oem-salesforce-integration.entity';
import { OemHierarchyEntity } from '../../oem/main/oem-hierarchies/oem-hierarchy.entity';
import { OemQuotesUsers } from '../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { OemCustomersProducts } from '../../oem/intermediaries/_oem-customers-products/oem-customers-products.entity';
import { SalesforceConnectionService } from './salesforce-connection/salesforce-connection.service';
import { TConnectionPool } from './salesforce-connection/types';

@Injectable()
export class SalesforceSyncService {
  constructor(
    // Need a transformer/integration module to separate the logic @saleforce_sync
    // This service should only be responsible for uploading information @saleforce_sync
    // We should not call any of these repos - only the integration module. @saleforce_sync
    // The integration module should include transformer + imported Salesforce service @saleforce_sync
    @Inject(Logger)
    private readonly logger: Logger,
    @InjectRepository(OemQuoteEntity)
    private quoteRepo: Repository<OemQuoteEntity>,
    @InjectRepository(OemQuotesProducts)
    private quoteProductRepo: Repository<OemQuotesProducts>,
    @InjectRepository(OemProductEntity)
    private productRepo: Repository<OemProductEntity>,
    @InjectRepository(OemSalesforceIntegrationEntity)
    private sfIntegrationRepo: Repository<OemSalesforceIntegrationEntity>,
    @InjectRepository(OemHierarchyEntity)
    private hierarchyTreeRepo: TreeRepository<OemHierarchyEntity>,
    @InjectRepository(OemQuotesUsers)
    private quoteUserRepo: Repository<OemQuotesUsers>,
    @InjectRepository(OemCustomersProducts)
    private customerProductRepo: TreeRepository<OemCustomersProducts>,
    @Inject(SalesforceConnectionService)
    private salesforceConnectionService: SalesforceConnectionService,
  ) {
    this.logger = new Logger(SalesforceSyncService.name);
  }

  private _riseAPIErrorSF(
    functionName: string,
    error: Error,
    companyId: number,
  ) {
    this.logger.error({
      func: `${SalesforceSyncService.name}/${functionName}`,
      stack: error.stack,
      error,
    });

    this.salesforceConnectionService._isRateLimitReachedSF(companyId);

    throw error;
  }

  /**
   * Logs in into salesforce then returns new token object.
   */
  public refreshTokenSF(companyId: number) {
    return this.salesforceConnectionService.refreshTokenSF(companyId);
  }

  /**
   * Grabs `accessToken`, processes it with `_transformOauthTokenSF`.
   */
  public getTokenObjectSF(companyId: number) {
    return this.salesforceConnectionService.getTokenObjectSF(companyId);
  }

  /**
   * 1. Fetches opportunity by `idOpportunity` from params.
   * 2. Then checks if `idAccount` property is missing,
   *  then makes recursive call with parsed account id from opportunity response.
   * 3. And then fetches also account data.
   */
  public async getOpportunityCustomer(
    params: OpportunityAccountGetDto,
    companyId: number,
  ) {
    try {
      const batchRequests = [];
      await this.salesforceConnectionService.initConnections();

      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      batchRequests.push(
        connection.sobject('Opportunity').retrieve(params.idOpportunity),
      );

      if (!params.idAccount) {
        const [opportunity] = await Promise.all(batchRequests);

        const accountId = opportunity.AccountId;
        params.idAccount = accountId?.slice(0, accountId.length - 3);

        return this.getOpportunityCustomer(params, companyId);
      }

      batchRequests.push(
        connection.sobject('Account').retrieve(params.idAccount),
      );

      return Promise.all(batchRequests);
    } catch (error) {
      const functionName = this.getOpportunityCustomer.name;

      this._riseAPIErrorSF(functionName, error, companyId);
    }
  }

  public async setCustomerIdSF(
    Id: string,
    Vendori_Customer_Id__c: number,
    companyId: number,
  ) {
    // console.log('setCustomerIdSF', Id, Vendori_Customer_Id__c);

    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      return connection.sobject('Account').update([
        {
          Id,
          Vendori_Customer_Id__c,
        },
      ]);
    } catch (error) {
      throw error;
    }
  }

  public async getContactList(companyId: number) {
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );
      return await connection.sobject('Contact').find();
    } catch (error) {
      const functionName = this.getContactList.name;

      this._riseAPIErrorSF(functionName, error, companyId);
    }
  }

  public async realTimeSyncQuote(quote: OemQuoteEntity) {
    if (!quote || !quote.opportunityId || quote.quotesProducts.length < 1)
      return;

    try {
      // Get all quotes and sync them
      const quotes = await this.quoteRepo
        .createQueryBuilder('quotes')
        .where('quotes.opportunityId = :opportunityId', {
          opportunityId: quote.opportunityId,
        })
        .leftJoinAndSelect('quotes.ownerUser', 'user')
        .leftJoinAndSelect('quotes.customer', 'customer')
        .leftJoinAndSelect('customer.customerAddresses', 'customerAddresses')
        .leftJoinAndSelect('customerAddresses.address', 'address')
        .leftJoinAndSelect('quotes.quotesProducts', 'quotesProducts')
        .leftJoinAndSelect('quotesProducts.product', 'product')
        .leftJoinAndSelect('product.pricingModel', 'pricingModel')
        .leftJoinAndSelect('product.productHierarchy', 'productHierarchy')
        .leftJoinAndSelect('productHierarchy.parent', 'parent')
        .getMany();
      const primaryQuotes = quotes.filter((q) => q.isPrimary);

      if (!quote.isPrimary && primaryQuotes.length === 0)
        quote.isPrimary = true;

      const connection = await this.salesforceConnectionService.getConnection(
        quote.companyId,
      );
      const opportunity = await connection
        .sobject('Opportunity')
        .retrieve(quote.opportunityId);

      // Check if quote is changed to primary or not and if yes, need to wipe out current opp products.
      if (
        quote.quoteId === opportunity['Primary_Vendori_Quote__c'] ||
        quote.isPrimary
      ) {
        const groupedQuotes = _.groupBy(quotes, 'companyId');

        try {
          for (const companyId in groupedQuotes) {
            const quotesGroup = groupedQuotes[companyId];

            const upsertBody = await SFFieldMappingUtil.quoteFieldMapping(
              quotesGroup,
            );

            await this.batchSyncQuoteSF(
              quotesGroup,
              upsertBody,
              Number(companyId),
            );

            // Wipe out the old opportunity products
            const isLastCompany =
              companyId ===
              Object.keys(groupedQuotes)[Object.keys(groupedQuotes).length - 1];

            if (isLastCompany) {
              const invalidQuotes = quotes
                .filter((q) => q.quoteId !== quote.quoteId) // !quote.isPrimary
                .map((q) => q.sfQuoteId);

              const rawOpportunityProducts = await connection
                .sobject('OpportunityLineItem')
                .find({ opportunityId: quote.opportunityId });

              const opportunityProductIds = rawOpportunityProducts
                .filter(
                  (so) =>
                    !so['Vendori_Quote__c'] ||
                    invalidQuotes.includes(so['Vendori_Quote__c']),
                )
                .map((so) => so['Id'])
                .filter((so) => !!so)
                .concat(
                  rawOpportunityProducts
                    .filter(
                      (so) => !invalidQuotes.includes(so['Vendori_Quote__c']),
                    )
                    .filter((so1, index, self) => {
                      // Filter out duplicates based on quoteId
                      return (
                        index ===
                        self.findIndex((so2) => so1['Id'] === so1['Id'])
                      );
                    })
                    .map((so) => so['Id'])
                    .filter((so) => !!so),
                );

              console.log(
                'realTimeSyncQuote',
                invalidQuotes,
                opportunityProductIds,
              );

              if (opportunityProductIds.length > 0) {
                let deletionInterval: any;

                const deleteCallback = async () => {
                  const deletedItems = await connection
                    .sobject('OpportunityLineItem')
                    .find({
                      Id: opportunityProductIds,
                    })
                    .destroy();

                  if (
                    deletedItems.length > 0 &&
                    deletedItems[deletedItems.length - 1]
                  )
                    clearInterval(deletionInterval);

                  console.log(
                    deletedItems.map((so) => so.success != true && so.errors),
                  );
                };

                deletionInterval = setInterval(deleteCallback, 1500);
              }
            }
          }
        } catch (error) {
          throw error;
        }
      } else {
        const upsertBody = await SFFieldMappingUtil.quoteFieldMapping([quote]);

        await this.batchSyncQuoteSF([quote], upsertBody, quote.companyId);
      }
    } catch (error) {
      console.error('realTimeSyncQuote', error);
    }
  }

  public async createMultipleAssetsSF(assetsBody: any[], companyId: number) {
    try {
      if (assetsBody.length) {
        this.handleBulkCreateJobSF(
          'Asset',
          'upsert',
          assetsBody,
          companyId,
          (id: string) => {
            this.syncAssetIdSF(id, companyId);
          },
          {
            extIdField: 'Vendori_Asset_Id__c',
          },
        );
      }
    } catch (error) {
      const functionName = this.createMultipleAssetsSF.name;

      this._riseAPIErrorSF(functionName, error, companyId);
    }
  }

  public async createAssetSF(assetBody: any, companyId: number) {
    try {
      if (assetBody) {
        const connection = await this.salesforceConnectionService.getConnection(
          companyId,
        );

        return await connection.sobject('Asset').create(assetBody);
      }
    } catch (error) {
      const functionName = this.createAssetSF.name;

      this._riseAPIErrorSF(functionName, error, companyId);
    }
  }

  public async batchSyncQuoteSF(
    quotes: OemQuoteEntity[],
    upsertBody: Array<any>,
    companyId: number,
  ) {
    try {
      // Quotes sync
      console.log('batchSyncQuoteSF > upsert', upsertBody);

      if (upsertBody.length) {
        this.handleBulkCreateJobSF(
          'Quote',
          'upsert',
          upsertBody,
          companyId,
          (id: string) => {
            this.syncQuoteIdSF(id, companyId);
          },
          { extIdField: 'Vendori_Quote_ID__c' },
        );
      }

      const primaryQuotes = quotes.filter(
        (q: OemQuoteEntity) =>
          !!q.isPrimary && !!q.opportunityId && q.quotesProducts.length > 0,
      );

      // Primary quotes sync
      if (primaryQuotes.length) {
        await this.syncPrimaryQuoteWithSF(primaryQuotes, companyId);

        // Quote Products sync
        // We sync quotes which are only primary to opportunity
        await this.syncQuoteProductsWithSF(primaryQuotes, companyId);
      }
    } catch (error) {
      console.error('batchSyncQuoteSF', error);
    }
  }

  // Add all products and then delete the ones not for the primary quote
  private async syncPrimaryQuoteWithSF(
    quotes: OemQuoteEntity[],
    companyId: number,
  ) {
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const requestBody = quotes.map((quote: OemQuoteEntity) =>
        SFFieldMappingUtil.opportunityFieldMapping(quote),
      );

      console.log('syncPrimaryQuoteWithSF: ', requestBody);

      await connection.sobject('Opportunity').update(requestBody);
    } catch (error) {
      throw error;
    }
  }

  private async syncQuoteProductsWithSF(
    quotes: OemQuoteEntity[],
    companyId: number,
  ) {
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const [quoteProductsToCreate, quoteProductsToUpdate] =
        await SFFieldMappingUtil.quoteProductFieldMapping(quotes);

      console.log('syncQuoteProductsWithSF', [
        quoteProductsToCreate,
        quoteProductsToUpdate,
      ]);

      if (quoteProductsToUpdate.length) {
        const updatedProducts = await connection
          .sobject('OpportunityLineItem')
          .update(
            _.cloneDeep(quoteProductsToUpdate).map((p) => {
              delete p['Product2Id'];
              delete p['OpportunityId'];

              return p;
            }),
          );

        // Recreate deleted products
        for (const i in updatedProducts) {
          if (
            !updatedProducts[i].success &&
            updatedProducts[i].errors[0]?.statusCode === 'ENTITY_IS_DELETED'
          ) {
            const uP = quoteProductsToUpdate[i];

            delete uP.Id;

            quoteProductsToCreate.push(uP);
          }
        }
      }

      console.log('quoteProductsToCreate', quoteProductsToCreate);

      if (quoteProductsToCreate.length)
        this.handleBulkCreateJobSF(
          'OpportunityLineItem',
          'insert',
          quoteProductsToCreate,
          companyId,
          (id: string) => {
            this.syncOpportunityProductIdSF(id, companyId);
          },
        );
    } catch (error) {
      throw error;
    }
  }

  private async syncProductIdSF(
    sfProductId: string | number,
    companyId: number,
  ) {
    if (!sfProductId) {
      console.error('syncProductIdSF > No sfProductId', sfProductId, companyId);
      return;
    }

    sfProductId = String(sfProductId);

    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const res = await connection.sobject('Product2').retrieve(sfProductId);

      await this.productRepo.update(res['Vendori_Product__c'], {
        sfProductId,
        updatedAt: () => '"updated_at"',
      });

      console.log('syncProductRealTimeSF', res);

      // if (!product.sfProductId) {
      // // Insert sf product id to vendori and add to standard pricebook

      // Get pricebook id from salesforce integration table
      // const sfIntegration = await this.sfIntegrationRepo
      //   .createQueryBuilder('sfIntegration')
      //   .where('sfIntegration.companyId = :companyId', {
      //     companyId: product.companyId,
      //   })
      //   .getOne();
      // if (!sfIntegration || !_.get(sfIntegration.settings, 'pricebookId'))
      //   return;
      // }

      await connection.sobject('PricebookEntry').insert(
        SFFieldMappingUtil.priceBookEntryFieldMapping(
          sfProductId,
          '01sDn000008NDrwIAG',
          // _.get(sfIntegration.settings, 'pricebookId'),
        ),
      );
    } catch (error) {
      throw error;
    }
  }

  private async syncAssetIdSF(sfAssetId: string, companyId: number) {
    if (!sfAssetId) return;
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const res = await connection.sobject('Asset').retrieve(sfAssetId);

      if (!res['Vendori_Asset_Id__c']) return;

      await this.customerProductRepo.update(res['Vendori_Asset_Id__c'], {
        sfAssetId: res.Id,
        updatedAt: () => '"updated_at"',
      });
    } catch (error) {
      throw error;
    }
  }

  private async syncQuoteIdSF(sfQuoteId: string, companyId: number) {
    if (!sfQuoteId) return;
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const res = await connection.sobject('Quote').retrieve(sfQuoteId);

      if (!res['Vendori_Quote_ID__c']) {
        this.logger.error(
          'syncQuoteIdSF > Quote Id',
          `There is no quote id returned for quote #${sfQuoteId}`,
        );

        return;
      }

      await this.quoteRepo.update(res['Vendori_Quote_ID__c'], {
        sfQuoteId: res.Id,
        updatedAt: () => '"updated_at"',
      });
    } catch (error) {
      throw error;
    }
  }

  private async syncOpportunityProductIdSF(
    sfOpportunityProductId: string,
    companyId: number,
  ) {
    if (!sfOpportunityProductId) return;
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const res = await connection
        .sobject('OpportunityLineItem')
        .retrieve(sfOpportunityProductId);

      await this.quoteProductRepo.update(res['Vendori_Quote_Product_ID__c'], {
        sfOpportunityProductId: res.Id,
        updatedAt: () => '"updated_at"',
      });
    } catch (error) {
      throw error;
    }
  }

  /* Quote Contact Syncing */
  public async batchSyncQuoteContactSF(
    quotesUsers: OemQuotesUsers[],
    companyId: number,
  ) {
    try {
      console.log('[Salesforce] batchSyncQuoteContactSF companyId', companyId);

      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      // console.log(
      //   '[Salesforce] batchSyncQuoteContactSF connection',
      //   connection,
      // );

      // Quote Contacts sync
      const { insert, destroy } =
        SFFieldMappingUtil.quoteContactFieldMapping(quotesUsers);

      // console.log('batchSyncQuoteContactSF > insert', insert, destroy);

      if (insert.length) {
        await this.handleBulkCreateJobSF(
          'OpportunityContactRole',
          'upsert',
          insert,
          companyId,
          (id: string) => {
            this.syncOpportunityContactRoleIdSF(id, companyId);
          },
        );

        // this.handleBulkCreateJobSF(
        //   'OpportunityContactRole',
        //   'insert',
        //   insert,
        //   (id: string) => {
        //     this.syncOpportunityContactRoleIdSF(id);
        //   },
        // );
      }

      if (destroy.length)
        await connection.sobject('OpportunityContactRole').del(destroy);

      for (const id of destroy) {
        await this.quoteUserRepo.update(
          { sfOpportunityContactRoleId: id },
          { sfOpportunityContactRoleId: null },
        );
      }
    } catch (error) {
      const functionName = this.batchSyncQuoteContactSF.name;

      this._riseAPIErrorSF(functionName, error, companyId);
    }
  }

  private async syncOpportunityContactRoleIdSF(
    sfOpportunityContactRoleId: string,
    companyId: number,
  ) {
    if (!sfOpportunityContactRoleId) return;
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const res = await connection
        .sobject('OpportunityContactRole')
        .retrieve(sfOpportunityContactRoleId);

      await this.quoteUserRepo.update(
        {
          quoteId: res['Vendori_Quote_ID__c'],
          // sfContactId: res['Vendori_Contact_ID__c'],
        },
        {
          sfOpportunityContactRoleId: res.Id,
          updatedAt: () => '"updated_at"',
        },
      );
    } catch (error) {
      throw error;
    }
  }

  /* Product Syncing  */
  public async syncProductRealTimeSF(
    product: OemProductEntity,
    deleted = false,
  ) {
    if (deleted) {
      const connection = await this.salesforceConnectionService.getConnection(
        product.companyId,
      );

      if (!product.sfProductId) {
        console.error(
          'syncProductRealTimeSF',
          `sfProductId is missing for #${product.productId}`,
        );

        return;
      } else {
        await connection.sobject('Product2').destroy(product.sfProductId);

        console.info(
          'syncProductRealTimeSF',
          `Product Deleted #${product.sfProductId}`,
        );

        return;
      }
    }

    const upsertBody = await SFFieldMappingUtil.productFieldMapping(
      product,
      product.productHierarchy,
    );

    // await connection
    //   .sobject('Product2')
    //   .upsert(upsertBody, 'Vendori_Product__c');

    await this.handleBulkCreateJobSF(
      'Product2',
      'upsert',
      [upsertBody],
      product.companyId,
      (id: string) => {
        this.syncProductIdSF(id, product.companyId);
      },
      { extIdField: 'Vendori_Product__c' },
    );
  }

  public async customerProductsSync(assets: Array<any>, conn: TConnectionPool) {
    for (const unsyncedAsset of assets) {
      const { Id } = unsyncedAsset;

      const customerProduct = SFFieldMappingUtil.customerProductFieldMapping(
        unsyncedAsset,
        conn.companyId,
      );

      if (customerProduct) {
        const result = await this.customerProductRepo.insert(customerProduct);

        const Vendori_Asset_Id__c = result.identifiers[0]['customerProductId'];

        // console.log(
        //   '[customerProductsSync] Vendori_Asset_Id__c',
        //   Vendori_Asset_Id__c,
        //   Id,
        // );
        await conn.connection.sobject('Asset').update({
          Id: Id,
          Vendori_Asset_Id__c: Vendori_Asset_Id__c,
        });
      }
    }
  }

  private async handleBulkCreateJobSF(
    objectName: string,
    operation = 'insert',
    requestBody: any,
    companyId: number,
    callback?: (id: number | string) => void,
    extIdField?: BulkOptions,
  ) {
    try {
      const connection = await this.salesforceConnectionService.getConnection(
        companyId,
      );

      const job = connection.bulk.createJob(objectName, operation, extIdField);
      const batch = job.createBatch();

      batch.execute(requestBody);

      console.log('handleBulkCreateJobSF', objectName, operation, extIdField);

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;

      // listen for events
      batch.on('error', function (batchInfo) {
        // fired when batch request is queued in server.
        that.logger.error({
          func: `${objectName}.${operation}/bulkCreation.error`,
          error: `${batchInfo}`,
        });
      });

      batch.on('queue', function (batchInfo) {
        // fired when batch request is queued in server.
        that.logger.log({
          func: `${objectName}.${operation}/bulkCreation.queue`,
          message: batchInfo,
        });

        batch.poll(1000 /* interval(ms) */, 20000 /* timeout(ms) */); // start polling - Do not poll until the batch has started
      });

      batch.on('response', function (rets) {
        // fired when batch finished and result retrieved
        for (let i = 0; i < rets.length; i++) {
          if (rets[i].success) {
            that.logger.log({
              func: `${objectName}.${operation}/bulkCreation.response`,
              message:
                '#' +
                (i + 1) +
                ` ${operation}ed successfully, id = ` +
                rets[i].id,
            });

            callback && callback(rets[i].id);
          } else {
            that.logger.error({
              func: `${objectName}.${operation}/bulkCreation.response`,
              message:
                '#' +
                (i + 1) +
                ' error occurred, message = ' +
                rets[i].errors.join(', '),
            });
          }
        }
      });
    } catch (error) {
      throw error;
    }
  }
}
