import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  EntityManager,
  Connection,
  PrimaryColumn,
  Column,
} from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

import { OemNotification } from './oem-notification.entity';
import { OemNotificationCreateDto } from './oem-notification.dto/oem-notification.create.dto';
import { IOemNotificationUpdateManyReqBody } from './oem-notification.type/oem-notification-update-many-req-body.type';
import { CommonDefaultMethodExtension } from '../../../../common/decorators/common-default-method-extention.decorator';
import { FilterCurrentUser } from '../../../../common/decorators/filter-current-user.decorator';
//TODO: it should come from config
import { VENDORI_SUPPORT_EMAIL } from '../../../../environments';
import { OemNotificationTypeEnum } from './oem-notification.enums/oem-notification.notification-type.enum';
import { Quote } from '../../oem-quotes/oem-quote.entity';
import {
  NotificationPreference,
  OemNotificationPreference,
} from '../oem-notification-preferences/oem-notification-preference.entity';
import { OemNotificationFrequencyType } from '../oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.frequency-type.enum';
import { OemNotificationWeeklyValue } from '../oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.weekly-value.enum';
import { OemNotificationMonthlyValue } from '../oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.monthly-value.enum';
import { StrictUnion } from '../../../../utils/strict-union-type.util';
import {
  ScheduleDailyDto,
  ScheduleMonthlyDto,
  ScheduleWeekDto,
} from '../../oem-rules/oem-rule-actions/oem-rule-actions.dto';

export type BatchList = {
  userId: number;
  name: string;
  email: string;
  quote: Quote;
  quoteApprovalQueueId?: number;
  schedule?: StrictUnion<
    ScheduleDailyDto | ScheduleWeekDto | ScheduleMonthlyDto
  >;
}[];

export enum NotificationRuleType {
  SUBMITTED_INTERNALLY = 'SUBMITTED_INTERNALLY',
  APPROVED_INTERNALLY = 'APPROVED_INTERNALLY',
  REJECTED_INTERNALLY = 'REJECTED_INTERNALLY',
  SENT_EXTERNALLY = 'SENT_EXTERNALLY',
  TRANSACTED_EXTERNALLY = 'TRANSACTED_EXTERNALLY',
  REJECTED_EXTERNALLY = 'REJECTED_EXTERNALLY',
}

@Injectable()
@CommonDefaultMethodExtension
export class OemNotificationsService extends TypeOrmCrudService<OemNotification> {
  private readonly logger = new Logger(OemNotificationsService.name);

  constructor(
    @InjectRepository(OemNotification)
    public repo: Repository<OemNotification>,
    @InjectRepository(NotificationPreference)
    public notificationPreferenceRepo: Repository<NotificationPreference>,
  ) {
    super(repo);
  }

  /* async notifyByEmail(type: NotificationRuleType, quote: OemQuoteEntity) {
     if (type === NotificationRuleType.APPROVED_INTERNALLY) {
       await this.quoteEmailService.sendApprovedEmail({
         quoteId: quote.quoteId,
         quoteName: quote.quoteName,
         quoteStatus: quote.quoteStatus,
         quoteNetAmount: quote.netAmount,
         quoteCurrency: quote.currency,
         companyName: quote.company.companyName,
         customerRegion: quote.customer.customerAddresses[0].address.region,
         emailList: { email: 'test@test.com' },
       });
     }
   }*/

  getNotificationType(type: NotificationRuleType): OemNotificationTypeEnum {
    const NotificationMap = {
      [NotificationRuleType.APPROVED_INTERNALLY]:
        OemNotificationTypeEnum.QUOTE_APPROVED,
      [NotificationRuleType.SUBMITTED_INTERNALLY]:
        OemNotificationTypeEnum.QUOTE_SUBMITTED,
      [NotificationRuleType.REJECTED_INTERNALLY]:
        OemNotificationTypeEnum.QUOTE_REJECTED,
      [NotificationRuleType.SENT_EXTERNALLY]:
        OemNotificationTypeEnum.QUOTE_APPROVED,
      [NotificationRuleType.TRANSACTED_EXTERNALLY]:
        OemNotificationTypeEnum.QUOTE_TRANSACTED,
      [NotificationRuleType.REJECTED_EXTERNALLY]:
        OemNotificationTypeEnum.QUOTE_REJECTED,
    };
    return NotificationMap[type];
  }

  //we use it like a temporary solution for notification rule
  //seems like depending of params which we set to notification record appropriate notification type will be handle
  async notify(
    notificationRuleType: NotificationRuleType,
    batchList: BatchList,
    manager,
  ): Promise<Array<Partial<OemNotification>>> {
    const type: OemNotificationTypeEnum =
      this.getNotificationType(notificationRuleType);
    const notifications: Partial<OemNotification>[] = [];
    //TODO: performance issue: we should have BULK support!
    if (batchList.length > 0) {
      for (const el of batchList) {
        //it has a bit rude implementation
        {
          notifications.push({
            companyId: el.quote.companyId,
            quoteId: el.quote.quoteId,
            customerId: el.quote.customerId,
            receiverId: el.userId,
            quoteApprovalQueueId: el.quoteApprovalQueueId,
            fromEmail: VENDORI_SUPPORT_EMAIL,
            toEmail: el.email,
            notificationType: type,
            status: 'pending',
            //isEnabled: true
          });
          const notification = await this.create(
            notifications[notifications.length - 1],
            manager,
          );

          const notificationPreference = await manager.save(
            NotificationPreference,
            this.notificationPreferenceRepo.create({
              notificationId: notification.notificationId,
              userId: el.userId,
              companyId: el.quote.companyId,
              changeFrequencyType:
                el.schedule?.frequency ||
                OemNotificationFrequencyType.IMMEDIATELY,
              approvalFrequencyType:
                el.schedule?.frequency ||
                OemNotificationFrequencyType.IMMEDIATELY,
              transactionFrequencyType:
                OemNotificationFrequencyType.IMMEDIATELY,
              submissionFrequencyType: OemNotificationFrequencyType.IMMEDIATELY,
              dailyFrequencyValue: el.schedule?.dailyFrequencyValue || '19:00',
              weeklyFrequencyValue:
                el.schedule?.weeklyFrequencyValue ||
                OemNotificationWeeklyValue.FRIDAY,
              monthlyFrequencyValue:
                el.schedule?.monthlyFrequencyValue ||
                OemNotificationMonthlyValue.FIRST,
              isActive: true,
              isEnabled: true,
            }),
          );

          console.log(notificationPreference)

          this.logger.debug({
            notificationPreference,
            message: `Notify - create notification preference`,
          });
        }
      }

      this.logger.debug({
        quoteId: batchList[0].quote.quoteId,
        message: `Notify - ${type}`,
      });
    }
    return notifications;
  }

  async handleSendGridCallback(reqBody: any) {
    this.logger.log({
      func: 'OemNotificationsService/handleSendGridCallback',
      reqBody,
      message: 'Handle SendGrid Callback',
    });

    // https://docs.sendgrid.com/for-developers/tracking-events/event#events
    for (const event of reqBody) {
      const { email, event: status, sg_message_id: messageId } = event;

      if (!email || !messageId) {
        continue;
      }

      const updateAttrs: any = {
        status,
        reqBody,
      };

      await this.repo.update(updateAttrs, {
        toEmail: email,
        messageId,
      });
    }
  }

  async create(dto: Partial<OemNotificationCreateDto>, manager: EntityManager) {
    //TODO: I don't like it, bc we can improve performance by getting a bulk of existing notifications and just create what weren't existed
    const notification = await manager.findOne(
      this.repo.target,
      this.repo.create(dto),
    );
    //insert doesn't work like expected
    if (!notification) {
      return (
        await manager.upsert(
          this.repo.target,
          { notificationId: notification?.notificationId, ...dto },
          {
            conflictPaths: ['notificationId'],
            skipUpdateIfNoValuesChanged: true,
          },
        )
      ).generatedMaps[0];
    }
    return notification;
  }

  async updateMany(reqBody: IOemNotificationUpdateManyReqBody) {
    return this.repo.manager.transaction(async (manager) => {
      const updatedNotifications: OemNotification[] = [];

      //TODO(performance issue!): this is really a bad solution when we try to get a bulk via single findOne, also we should save it via a bulk update method
      for (const payload of reqBody.bulk) {
        const { notificationId, isRead } = payload;

        const notification = await this.repo.findOne(payload.notificationId);
        if (!notification) {
          throw new NotFoundException(
            `Notification not found with ID - ${notificationId}`,
          );
        }

        notification.isRead = isRead;
        await manager.save(OemNotification, notification);

        updatedNotifications.push(notification);
      }

      return updatedNotifications;
    });
  }

  @FilterCurrentUser('receiverId')
  async getMany(req: CrudRequest) {
    return super.getMany(req);
  }
}
