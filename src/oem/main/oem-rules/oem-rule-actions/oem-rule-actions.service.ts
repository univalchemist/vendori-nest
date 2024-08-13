import {InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  BatchList,
  OemNotificationsService,
} from '../../oem-notifications/oem-notifications/oem-notifications.service';
import { Inject } from '@nestjs/common';
import {
  ActionTypeEnum,
  RuleActionDto,
  RuleActionNotify, ScheduleDailyDto, ScheduleMonthlyDto, ScheduleWeekDto,
} from './oem-rule-actions.dto';
import { CrudRequest } from '@nestjsx/crud';
import { OemQuoteApprovalQueuesService } from '../../../intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queues.service';
import { QuoteApprovalQueueStatusEnum } from '../../../intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.enums/quote-approval-queue-status.enum';
import { SetCurrentTenant } from '../../../../common/decorators/set-current-tenant.decorator';
import { OemQuoteEntity } from '../../oem-quotes/oem-quote.entity';
import { OemQuotesUsers } from '../../../intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { StrictUnion } from '../../../../utils/strict-union-type.util';

@SetCurrentTenant
export class OemRuleActionsService {
  constructor(
    @InjectRepository(OemQuotesUsers)
    public quotesUsersRepo: Repository<OemQuotesUsers>,
    @Inject(OemNotificationsService)
    public notificationsService: OemNotificationsService,
    @Inject(OemQuoteApprovalQueuesService)
    public quoteApprovalService: OemQuoteApprovalQueuesService,
  ) {}

  protected async autoApproveQuote(
    req: CrudRequest,
    quoteId: number,
  ): Promise<OemQuoteEntity> {
    return this.quoteApprovalService.autoOperateApprovalQueue(
      req,
      QuoteApprovalQueueStatusEnum.APPROVED,
      quoteId,
      this.quotesUsersRepo.manager,
    );
  }

  protected async autoRejectQuote(
    req: CrudRequest,
    quoteId: number,
  ): Promise<OemQuoteEntity> {
    return this.quoteApprovalService.autoOperateApprovalQueue(
      req,
      QuoteApprovalQueueStatusEnum.REJECTED,
      quoteId,
      this.quotesUsersRepo.manager,
    );
  }

  protected async notify(req: CrudRequest, action: RuleActionNotify) {
    const quoteUserIds: {
      userId: number;
      quoteId: number;
      quoteApprovalQueueId: number;
      schedule?: StrictUnion<
        ScheduleDailyDto | ScheduleWeekDto | ScheduleMonthlyDto
      >;
    }[] = [];
    for (const notification of action.options.bulkNotification) {
      quoteUserIds.push({
        userId: notification.userId,
        quoteId: notification.quoteId,
        quoteApprovalQueueId: notification['quoteApprovalQueueId'],
        schedule: notification.schedule,
      });
    }

    const quoteUsers = await this.quotesUsersRepo.find({
      where: {
        userId: In([...quoteUserIds.map((quoteUserId) => quoteUserId.userId)]),
        quoteId: In([
          ...quoteUserIds.map((quoteUserId) => quoteUserId.quoteId),
        ]),
      },
      relations: ['user', 'quote'],
    });
    const batchEmail: BatchList = quoteUsers.map((quoteUser, i) => {
      return {
        quote: quoteUser.quote,
        userId: quoteUser.user.userId,
        name: quoteUser.user.fullName,
        email: quoteUser.user.notificationEmail || quoteUser.user.ssoLoginEmail,
        quoteApprovalQueueId: quoteUserIds[i]?.quoteApprovalQueueId,
        schedule: quoteUserIds[i].schedule,
      };
    });
    return await this.notificationsService.notify(
      action.options.notificationRuleType,
      batchEmail,
      this.quotesUsersRepo.manager,
    );
  }

  public async resolve(req: CrudRequest, data: RuleActionDto) {
    switch (data.action.actionType) {
      case ActionTypeEnum.AUTO_APPROVE:
        return this.autoApproveQuote(req, data.action.options.quoteId);
      case ActionTypeEnum.AUTO_REJECT:
        return this.autoRejectQuote(req, data.action.options.quoteId);
      case ActionTypeEnum.NOTIFY:
        return this.notify(req, data.action);
    }
    //this.notificationsService.notify()
  }
}
