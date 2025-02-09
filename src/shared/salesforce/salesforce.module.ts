import { Logger, Module } from '@nestjs/common';
import { Connection as SalesforceClient } from 'jsforce';

import { SalesforceSyncService } from './salesforce-sync.service';

//TODO: we should not use env directly everything should come from config @saleforce_sync
import {
  SALESFORCE_LOGIN_URI,
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
} from '../../environments';

import { TypeOrmModule } from '@nestjs/typeorm';
import { OemProductEntity } from '../../oem/main/oem-products/oem-product.entity';
import { OemSalesforceIntegrationEntity } from '../../oem/main/oem-integrations/oem-salesforce-integrations/oem-salesforce-integration.entity';
import { OemHierarchyEntity } from '../../oem/main/oem-hierarchies/oem-hierarchy.entity';
import { OemQuoteEntity } from '../../oem/main/oem-quotes/oem-quote.entity';
import { OemQuotesProducts } from '../../oem/intermediaries/_oem-quotes-products/oem-quotes-products.entity';
import { OemCustomersProducts } from '../../oem/intermediaries/_oem-customers-products/oem-customers-products.entity';
import { OemQuotesUsers } from '../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { SalesforceConnection } from './salesforce-connection/salesforce-connection.module';

//TODO: salesforce module shouldn't know about vendori structure, it should be responsible only for sending data @saleforce_sync
//TODO: also need to use config service here @saleforce_sync
@Module({
  imports: [
    TypeOrmModule.forFeature([
      OemQuoteEntity,
      OemQuotesProducts,
      OemProductEntity,
      OemSalesforceIntegrationEntity,
      OemHierarchyEntity,
      OemQuotesUsers,
      OemCustomersProducts,
    ]),
    SalesforceConnection,
  ],
  providers: [
    SalesforceSyncService,
    Logger,
    {
      provide: SalesforceClient,
      useFactory: () =>
        new SalesforceClient({
          oauth2: {
            loginUrl: SALESFORCE_LOGIN_URI,
            clientId: SALESFORCE_CLIENT_ID,
            clientSecret: SALESFORCE_CLIENT_SECRET,
          },
        }),
    },
  ],
  exports: [SalesforceSyncService],
  controllers: [],
})
export class SalesforceModule {}
