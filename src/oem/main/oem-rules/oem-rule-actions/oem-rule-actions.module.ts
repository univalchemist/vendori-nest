import { Module } from '@nestjs/common';
import { OemRuleActionsController } from './oem-rule-actions.controller';
import { OemRuleActionsService } from './oem-rule-actions.service';
import { OemQuoteApprovalQueuesModule } from '../../../intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queues.module';
import { OemNotificationsModule } from '../../oem-notifications/oem-notifications/oem-notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OemQuotesUsers } from '../../../intermediaries/_oem-quotes-users/oem-quotes-users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OemQuotesUsers]),
    OemQuoteApprovalQueuesModule,
    OemNotificationsModule,
  ],
  providers: [OemRuleActionsService],
  exports: [OemRuleActionsService],
  controllers: [OemRuleActionsController],
})
export class OemRuleActionsModule {}
