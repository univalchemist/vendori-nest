import { Logger, Module } from '@nestjs/common';
import { SalesforceConnectionService } from './salesforce-connection.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OemSalesforceIntegrationEntity } from '../../../oem/main/oem-integrations/oem-salesforce-integrations/oem-salesforce-integration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OemSalesforceIntegrationEntity])],
  providers: [SalesforceConnectionService, Logger],
  exports: [SalesforceConnectionService],
})
export class SalesforceConnection {}
