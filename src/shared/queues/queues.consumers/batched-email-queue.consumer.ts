import { Inject, Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Connection, EntityManager, In } from 'typeorm';

import {
  APP_ROOT_URL,
  MAIL_BATCHED_UPDATE_TEMPLATE_ID,
  VENDORI_COMPANY_ADDRESS,
  VENDORI_SUPPORT_EMAIL,
} from '../../../environments';

import { EmailDynamicTemplate, EmailMessage } from '../../email/email.type';
import { sendGridEmailWithDynamicTemplate } from '../../email';
import { OemNotification } from '../../../oem/main/oem-notifications/oem-notifications/oem-notification.entity';
import { OemNotificationPreferencesService } from '../../../oem/main/oem-notifications/oem-notification-preferences/oem-notification-preferences.service';
import { OemNotificationTypeEnum } from '../../../oem/main/oem-notifications/oem-notifications/oem-notification.enums/oem-notification.notification-type.enum';
import { OemNotificationPreferenceType } from '../../../oem/main/oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.type.enum';
import { OemQuotesUsers } from '../../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { OemUserEntity } from '../../../oem/main/oem-users/oem-user.entity';
import { OemVendosUsers } from '../../../oem/intermediaries/_oem-vendos-users/oem-vendos-users.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { QueueNames } from '../queues.enums/queue-enum';
import { OemNotificationPreference } from '../../../oem/main/oem-notifications/oem-notification-preferences/oem-notification-preference.entity';

@Processor(QueueNames.BatchedEmail)
export class BatchedEmailQueueConsumer {
  private readonly logger = new Logger(BatchedEmailQueueConsumer.name);

  constructor(
    @InjectDataSource('MASTER_CONNECTION')
    private connection: Connection,
    @Inject(OemNotificationPreferencesService)
    private notificationPreferencesService: OemNotificationPreferencesService,
  ) {
    //TODO: what is it????
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.notificationPreferencesService['repo']['manager'].connection =
      this.connection;
  }

  @Process()
  async process(job: Job) {
    await job.progress(0);

    // console.log('job', job);
    try {
      const notifications = await this.connection.manager
        .createQueryBuilder(OemNotification, 'notifications')
        .innerJoinAndSelect('notifications.company', 'company')
        .innerJoinAndSelect(
          'notifications.receiver',
          'receiver',
          'receiver.isActive = TRUE',
        )
        .leftJoinAndSelect(
          'receiver.notificationPreference',
          'notificationPreference',
          'notificationPreference.isActive = TRUE',
        )
        .leftJoinAndSelect('notifications.quote', 'quote')
        .leftJoinAndSelect('notifications.vendo', 'vendo')
        .leftJoinAndSelect('notifications.customer', 'customer')
        .leftJoinAndSelect(
          'notifications.quoteApprovalQueue',
          'quoteApprovalQueue',
        )
        .leftJoinAndSelect(
          'notifications.vendoApprovalQueue',
          'vendoApprovalQueue',
        )
        .where(`notifications.status = 'pending'`)
        .orderBy({
          'notifications.receiverId': 'ASC',
          'notifications.quoteId': 'ASC',
          'notifications.vendoId': 'ASC',
          'notifications.notificationType': 'ASC',
        })
        .getMany();

      if (notifications.length === 0) {
        await job.progress(100);
        return;
      }

      // group by receivers
      const notificationsGroupedByUsers: {
        [receiverId: number]: OemNotification[];
      } = {};
      notifications.forEach((notification) => {
        if (notificationsGroupedByUsers[notification.receiverId]) {
          notificationsGroupedByUsers[notification.receiverId].push(
            notification,
          );
        } else {
          notificationsGroupedByUsers[notification.receiverId] = [notification];
        }
      });

      const notificationsForUsers = Object.values(notificationsGroupedByUsers);
      for (let i = 0; i < notificationsForUsers.length; i++) {
        const notificationsForUser = notificationsForUsers[i];
        await this.connection.transaction(async (manager) => {
          await this.sendBatchedEmail(notificationsForUser, manager);
        });

        await job.progress(
          (((i + 1) / notificationsForUsers.length) * 100).toFixed(2),
        );
      }

      await job.update({
        notificationIds: notifications.map(
          (notification) => notification.notificationId,
        ),
      });
    } catch (error) {
      this.logger.error({
        func: 'BatchedEmailQueueConsumer/process',
        error,
      });

      throw error;
    }

    await job.progress(100);
  }

  async sendBatchedEmail(
    notificationsForUser: OemNotification[],
    manager: EntityManager,
  ) {
    const { company, receiver } = notificationsForUser[0];
    const { notificationPreference } = receiver;

    const notificationsToDispatch: OemNotification[] = [];
    for (const notification of notificationsForUser) {
      //temporary solution
      //TODO: performance issue, we should have a bulk
      const notificationPreferenceByNotificationId =
        await this.connection.manager
          .createQueryBuilder(
            OemNotificationPreference,
            'notificationPreference',
          )
          .where(`notificationPreference.isActive = TRUE`)
          .andWhere('notificationPreference.notificationId = :notificationId', {
            notificationId: notification.notificationId,
          })
          .getOne();
      //
      const isTimeForBatchedEmail =
        this.notificationPreferencesService.isTimeForBatchedEmail(
          notificationPreference || notificationPreferenceByNotificationId,
        );

      const isTime =
        ([
          OemNotificationTypeEnum.QUOTE_APPROVED,
          OemNotificationTypeEnum.QUOTE_REJECTED,
          OemNotificationTypeEnum.VENDO_APPROVED,
          OemNotificationTypeEnum.VENDO_REJECTED,
        ].includes(notification.notificationType) &&
          isTimeForBatchedEmail[
            OemNotificationPreferenceType.APPROVAL_OR_REJECTION
          ]) ||
        ([
          OemNotificationTypeEnum.QUOTE_CHANGED,
          OemNotificationTypeEnum.QUOTE_EXPIRED,
          OemNotificationTypeEnum.VENDO_CHANGED,
          OemNotificationTypeEnum.VENDO_EXPIRED,
        ].includes(notification.notificationType) &&
          isTimeForBatchedEmail[OemNotificationPreferenceType.OTHER_CHANGES]) ||
        ([
          OemNotificationTypeEnum.QUOTE_SUBMITTED,
          OemNotificationTypeEnum.VENDO_SUBMITTED,
        ].includes(notification.notificationType) &&
          isTimeForBatchedEmail[OemNotificationPreferenceType.SUBMISSION]) ||
        ([
          OemNotificationTypeEnum.QUOTE_TRANSACTED,
          OemNotificationTypeEnum.VENDO_TRANSACTED,
        ].includes(notification.notificationType) &&
          isTimeForBatchedEmail[OemNotificationPreferenceType.TRANSACTION]);

      if (isTime) {
        notificationsToDispatch.push(notification);
      }
    }

    if (!notificationsToDispatch) {
      return;
    }

    const subject = 'Here are your notifications based on your preference';
    const email = receiver.notificationEmail || receiver.ssoLoginEmail;

    const items: {
      imageURL: string;
      formattedText: string;
    }[] = [];

    for (const notification of notificationsToDispatch) {
      const {
        company,
        customer,
        quote,
        vendo,
        quoteApprovalQueue,
        vendoApprovalQueue,
      } = notification;

      const imageURL = customer?.logoUrl || company.logoUrl;
      let formattedText: string;

      const ownerQuoteUser = await manager
        .createQueryBuilder(OemQuotesUsers, 'quoteUser')
        .innerJoinAndSelect('quoteUser.user', 'user')
        .where('quoteUser.quoteId = :quoteId AND quoteUser.isOwner = TRUE', {
          quoteId: quote?.quoteId,
        })
        .getOne();

      const ownerVendoUser = await manager
        .createQueryBuilder(OemVendosUsers, 'vendoUser')
        .innerJoinAndSelect('vendoUser.user', 'user')
        .where('vendoUser.vendoId = :vendoId AND vendoUser.isOwner = TRUE', {
          vendoId: vendo.vendoId,
        })
        .getOne();

      switch (notification.notificationType) {
        case OemNotificationTypeEnum.QUOTE_SUBMITTED:
          formattedText = `${
            ownerQuoteUser?.user.fullName || 'A user'
          } has submitted a quote that requires your approval.<br/><br/>
          <strong> ${customer?.customerName || 'Customer TBD'} | ${
            quote.netAmount
          } | ${quote.quoteUuid} </strong> <br/><br/>`;
          break;
        case OemNotificationTypeEnum.QUOTE_APPROVED:
          formattedText = `${
            ownerQuoteUser?.user.fullName || 'A user'
          } has sent you a proposal!<br/><br/>
          <strong> ${customer?.customerName || 'Customer TBD'} | ${
            quote.netAmount
          } | ${quote.quoteUuid} </strong> <br/><br/>`;
          break;
        case OemNotificationTypeEnum.QUOTE_REJECTED:
          const rejectedUser = await manager.findOne(
            OemUserEntity,
            quoteApprovalQueue.userId,
            {
              relations: ['role'],
            },
          );

          const rejectedRole = rejectedUser?.role?.roleType;

          formattedText = `${
            rejectedRole || 'A user'
          } rejected the quote.<br/><br/>
            <strong> ${company.companyName} | ${quote.netAmount} | ${
            quote.quoteUuid
          } </strong>`;
          break;
        case OemNotificationTypeEnum.QUOTE_EXPIRED:
          formattedText = `Quote ${quote.quoteName} has been expired.<br/><br/>
              <strong> ${company.companyName} | ${quote.netAmount} | ${quote.quoteUuid} </strong>`;
          break;
        case OemNotificationTypeEnum.QUOTE_TRANSACTED:
          formattedText = `Congratulations!<br>${
            customer?.customerName || 'Customer TBD'
          } has accepted your quote!
              <strong> ${company.companyName} | ${quote.netAmount} | ${
            quote.quoteUuid
          } </strong>`;
          break;
        case OemNotificationTypeEnum.VENDO_SUBMITTED:
          formattedText = `${
            ownerVendoUser.user.fullName || 'A user'
          } has submitted a vendo that requires your approval.<br/><br/>
            <strong> ${customer?.customerName || 'Customer TBD'} | ${
            vendo.vendoUuid
          } </strong> <br/><br/>`;
          break;
        case OemNotificationTypeEnum.VENDO_EXPIRED:
          formattedText = `Vendo ${vendo.vendoName} has been expired.<br/><br/>
            <strong> ${company.companyName} | ${vendo.vendoUuid} </strong>`;
          break;
        case OemNotificationTypeEnum.VENDO_TRANSACTED:
          formattedText = `Congratulations!<br>${
            customer?.customerName || 'Customer TBD'
          } has accepted your vendo!
              <strong> ${company.companyName} | ${vendo.vendoUuid} </strong>`;
          break;
        default:
          continue;
      }

      items.push({
        imageURL,
        formattedText,
      });
    }

    const dynamicTemplateData: EmailDynamicTemplate = {
      logoURL:
        company.logoUrl /*'https://staging.vendori.com/images/DarkLogo.svg'*/,
      CTA: `${APP_ROOT_URL}/quotes/manage-alerts`,
      subject,
      items,
      companyAddress: VENDORI_COMPANY_ADDRESS,
      emailverify: `
      This message was sent to ${email} because you're a user in the ${
        company?.companyName || 'company'
      } Vendori account.
      click <a href="https://demo.vendori.com/manage-alerts">here</a> to view your in-app notification settings.`,
    };

    const emailMessage: EmailMessage = {
      subject,
      from: {
        name: 'Vendori',
        email: VENDORI_SUPPORT_EMAIL,
      },
      to: [
        {
          name: receiver.fullName,
          email,
        },
      ],
      templateId: MAIL_BATCHED_UPDATE_TEMPLATE_ID,
      dynamicTemplateData,
    };

    const result = await sendGridEmailWithDynamicTemplate(emailMessage);
    const messageId = result[0].headers['x-message-id'];

    const notificationIdsToUpdate = notificationsToDispatch.map(
      (notification) => notification.notificationId,
    );

    await manager.update(
      OemNotification,
      {
        notificationId: In(notificationIdsToUpdate),
      },
      {
        subject,
        batchedAt: new Date(),
        messageId,
        status: 'requested',
        metaData: emailMessage,
      },
    );
  }
}
