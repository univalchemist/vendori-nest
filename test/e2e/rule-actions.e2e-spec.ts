// Dependencies
import { TestingModule } from '@nestjs/testing';
import { factory, runSeeder, useSeeding } from 'typeorm-seeding';
import { INestTestApp } from '../test.interfaces/nest-test-app.interface';
import { SessionAuthGuard } from '../../src/auth/guards/session-auth.guard';

// Seeds
import CreateOemRoles from '../../src/oem/seeds/create-oem-roles.seed';
import CreateOemHierarchyLevels from '../../src/oem/seeds/create-oem-hierarchy-levels.seed';
import CreateOemHierarchies from '../../src/oem/seeds/create-oem-hierarchies.seed';

// Entities
import { OemUserEntity } from '../../src/oem/main/oem-users/oem-user.entity';
import { OemCompanyEntity } from '../../src/oem/main/oem-companies/oem-company.entity';

// Enums
import { METHODS } from '../test.enums/methods.enum';
import { QuoteStatusEnum } from '../../src/oem/main/oem-quotes/oem-quote.enums/quote-status.enum';

// Services
import { AuthService } from '../../src/auth/auth.service';

// Utils
import { initNestTestApp } from '../test.utils/init-nest-app.util';
import initCrudTesting from '../test.utils/init-crud-tests.util';
import { clearDB } from '../../src/utils/clear-db.util';
import initModuleFixture from '../test.utils/init-module-fixture.util';
import { initPolicy } from '../test.utils/init-policy.util';
import { closeAllConnection } from '../test.utils/close-all-connections.util';
import { RunMultipleSeeds } from '../../src/oem/seeds/seed.utils/run-multiple-seeds.util';
import { initDefer } from '../../src/utils/init-defer.util';

// Seeds
import CreateOemCompanies from '../../src/oem/seeds/create-oem-companies.seed';
import CreateOemAddresses from '../../src/oem/seeds/create-oem-addresses.seed';
import CreateOemCustomer from '../../src/oem/seeds/create-oem-customer.seed';
import CreateOemContacts from '../../src/oem/seeds/create-oem-contacts.seed';
import CreateOemChannels from '../../src/oem/seeds/create-oem-channels.seed';
import CreateOemCompanyPrograms from '../../src/oem/seeds/create-oem-company-programs.seed';
import CreateOemLicensingPrograms from '../../src/oem/seeds/create-oem-licensing-programs.seed';
import { ActionTypeEnum } from '../../src/oem/main/oem-rules/oem-rule-actions/oem-rule-actions.dto';
import { NotificationRuleType } from '../../src/oem/main/oem-notifications/oem-notifications/oem-notifications.service';
import { OemNotificationFrequencyType } from '../../src/oem/main/oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.frequency-type.enum';
import { OemCustomerAddresses } from '../../src/oem/intermediaries/_oem-customer-addresses/oem-customer-addresses.entity';
import { OemQuoteEntity } from '../../src/oem/main/oem-quotes/oem-quote.entity';
import { OemQuotesUsers } from '../../src/oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { QuoteUserTypeEnum } from '../../src/oem/intermediaries/_oem-quotes-users/oem-quotes-users.enums/quoteUserTypeEnum';
import { OemQuoteApprovalQueue } from '../../src/oem/intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.entity';
import { QuoteApprovalQueueTargetTypeEnum } from '../../src/oem/intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.enums/quote-approval-queue-target-type.enum';
import * as _ from 'lodash';
import * as moment from 'moment-timezone';
import CreateOemApprovalQueuePriorities from '../../src/oem/seeds/create-oem-approval-queue-priorities.seed';
import { getConnection } from 'typeorm';
import { OemRecentlyViewedQuotesVendos } from '../../src/oem/intermediaries/_oem-recently-viewed-quotes-vendos/oem-recently-viewed-quotes-vendos.entity';
import { OemNotification } from '../../src/oem/main/oem-notifications/oem-notifications/oem-notification.entity';
import { OemNotificationTypeEnum } from '../../src/oem/main/oem-notifications/oem-notifications/oem-notification.enums/oem-notification.notification-type.enum';
import { OemNotificationPreference } from '../../src/oem/main/oem-notifications/oem-notification-preferences/oem-notification-preference.entity';

describe('Action Rules Controller (e2e)', () => {
  jest.setTimeout(50000);
  let NestAppTest: INestTestApp;
  const PATH = '/rule-actions';

  const { defers, tests } = initCrudTesting({
    path: PATH,
    only: {
      ['ACTION_RULES_POST']: {
        method: METHODS.POST,
        path: PATH,
        status: 200,
      },
    },
  });
  const { deferServer, deferComparedData, deferSentData } = defers;

  const deferAutoApproveSentData = initDefer();
  const deferAutoRejectSentData = initDefer();
  const deferNotifyRejectSentData = initDefer();
  const deferNotifyExternallySentData = initDefer();

  const { DESCRIBE_ACTION_RULES_POST } = tests;

  beforeAll(async () => {
    await initPolicy();
    await useSeeding();
    const moduleFixture: TestingModule = await initModuleFixture().compile();
    NestAppTest = await initNestTestApp(moduleFixture);

    const [
      company,
      roles,
      approvalQueuePriorities,
      hierarchyLevel,
      hierarchy,
      addresses,
      customers,
      contacts,
      channels,
      companyPrograms,
      licensingPrograms,
    ] = await RunMultipleSeeds([
      CreateOemCompanies,
      CreateOemRoles(),
      CreateOemApprovalQueuePriorities,
      CreateOemHierarchyLevels,
      CreateOemHierarchies,
      CreateOemAddresses,
      CreateOemCustomer,
      CreateOemContacts,
      CreateOemChannels,
      CreateOemCompanyPrograms,
      CreateOemLicensingPrograms,
    ]);

    const internalUser = await factory(OemUserEntity)().create({
      userId: 6,
      companyId: 1,
      firstName: 'Demo',
      geoHierarchyId: 1,
      roleId: 2,
      lastName: 'Vendori',
      notificationEmail: 'demo1.dust@gmail.com',
      ssoLoginEmail: 'demo1@gmail.com',
      isExternal: false,
      isHideWelcomeText: false,
    });

    const customerUser = await factory(OemUserEntity)().create({
      userId: 7,
      companyId: 1,
      firstName: 'Villi',
      geoHierarchyId: 1,
      roleId: 4,
      lastName: 'Vendori',
      notificationEmail: 'demoExternal2@gmail.com',
      ssoLoginEmail: 'demoExternal2@gmail.com',
      isExternal: true,
      isHideWelcomeText: false,
    });

    const internalUser2 = await factory(OemUserEntity)().create({
      userId: 8,
      companyId: 1,
      firstName: 'Demo',
      geoHierarchyId: 1,
      roleId: 2,
      lastName: 'Vendori',
      notificationEmail: 'demo2.dust@gmail.com',
      ssoLoginEmail: 'demo2@gmail.com',
      isExternal: false,
      isHideWelcomeText: false,
    });

    const customerAddresses = await factory(OemCustomerAddresses)().create({
      companyId: 1,
      addressId: 1,
      customerId: 1,
    });

    const externalUser = await factory(OemUserEntity)().create({
      userId: 9,
      companyId: 1,
      firstName: 'Vadim',
      geoHierarchyId: 1,
      roleId: 4,
      lastName: 'Vendori',
      notificationEmail: 'Demo_partner@vendori.com',
      ssoLoginEmail: 'demo3@gmail.com',
      isExternal: true,
      isHideWelcomeText: false,
    });

    const quote = await factory(OemQuoteEntity)().create({
      currency: 'usd',
      //opportunityId: null,
      // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
      netAmount: 9993421437874378.321876876321,
      quoteStatus: QuoteStatusEnum.PENDING_INTERNAL_APPROVAL,
    });
    //create internal quote user
    await factory(OemQuotesUsers)().create({
      userId: internalUser.userId,
      quoteId: 1,
      isOwner: true,
      isApprover: false,
      type: QuoteUserTypeEnum.INTERNAL,
      companyId: 1,
    });

    //create internal quote user 2
    await factory(OemQuotesUsers)().create({
      userId: internalUser.userId,
      quoteId: 1,
      isOwner: true,
      isApprover: false,
      type: QuoteUserTypeEnum.INTERNAL,
      companyId: 1,
    });

    //create customer quote user
    await factory(OemQuotesUsers)().create({
      userId: customerUser.userId,
      quoteId: 1,
      isOwner: false,
      isApprover: true,
      type: QuoteUserTypeEnum.END_CUSTOMER,
      companyId: 1,
    });

    //create quote externalUser
    await factory(OemQuotesUsers)().create({
      userId: externalUser.userId,
      quoteId: 1,
      isOwner: false,
      isApprover: false,
      type: QuoteUserTypeEnum.PARTNER_SALES,
      companyId: 1,
    });

    //quote approval for internal user
    await factory(OemQuoteApprovalQueue)({
      quoteApprovalQueueId: 1,
      companyId: (company as unknown as OemCompanyEntity).companyId,
      userId: internalUser.userId,
      quoteId: quote.quoteId,
      approvalQueuePriorityId: 1,
      token: 'test_token',
    }).create();

    //quote approval for internal user 2
    const quoteApprovalQueue2 = await factory(OemQuoteApprovalQueue)({
      quoteApprovalQueueId: 2,
      companyId: (company as unknown as OemCompanyEntity).companyId,
      userId: internalUser2.userId,
      quoteId: quote.quoteId,
      approvalQueuePriorityId: 2,
      token: 'test_token',
    }).create();

    //quote approval queue customer
    await factory(OemQuoteApprovalQueue)({
      quoteApprovalQueueId: 2,
      companyId: (company as unknown as OemCompanyEntity).companyId,
      userId: customerUser.userId,
      quoteId: quote.quoteId,
      targetType: QuoteApprovalQueueTargetTypeEnum.CUSTOMER,
      approvalQueuePriorityId: 1,
      token: 'test_token',
    }).create();

    const userDemo = await factory(OemUserEntity)().create({
      ssoLoginEmail: 'test_user@vendori.com',
    });

    const authService = moduleFixture.get<AuthService>(AuthService);

    const access_token = (await authService.loginUser(userDemo)).access_token;

    deferServer.resolve(NestAppTest.server);
    deferAutoApproveSentData.resolve({
      access_token: access_token,
      body: {
        action: {
          actionType: ActionTypeEnum.AUTO_APPROVE,
          options: {
            quoteId: quote.quoteId,
          },
        },
      },
    });

    deferAutoRejectSentData.resolve({
      access_token: access_token,
      body: {
        action: {
          actionType: ActionTypeEnum.AUTO_REJECT,
          options: {
            quoteId: quote.quoteId,
          },
        },
      },
    });
    deferNotifyRejectSentData.resolve({
      access_token: access_token,
      body: {
        action: {
          actionType: ActionTypeEnum.NOTIFY,
          options: {
            notificationRuleType: NotificationRuleType.REJECTED_INTERNALLY,
            bulkNotification: [
              {
                quoteId: quote.quoteId,
                userId: internalUser.userId,
                quoteApprovalQueueId: quoteApprovalQueue2.quoteApprovalQueueId,
                schedule: {
                  frequency: OemNotificationFrequencyType.DAILY,
                  dailyFrequencyValue: '21:13',
                },
              },
            ],
          },
        },
      },
    });
    deferNotifyExternallySentData.resolve({
      access_token: access_token,
      body: {
        action: {
          actionType: ActionTypeEnum.NOTIFY,
          options: {
            notificationRuleType: NotificationRuleType.SENT_EXTERNALLY,
            bulkNotification: [
              {
                quoteId: quote.quoteId,
                userId: internalUser.userId,
              },
            ],
          },
        },
      },
    });
  });

  afterAll(async () => {
    await clearDB();
    await closeAllConnection();
    await NestAppTest.app.close();
    global.gc && global.gc();
  });
  //Auto-Approve

  DESCRIBE_ACTION_RULES_POST(
    { quoteStatus: QuoteStatusEnum.APPROVED },
    deferAutoApproveSentData.get(),
  );

  //Auto-Reject
  DESCRIBE_ACTION_RULES_POST(
    { quoteStatus: QuoteStatusEnum.REJECTED },
    deferAutoRejectSentData.get(),
  );

  // Notify
  DESCRIBE_ACTION_RULES_POST(
    { notificationType: OemNotificationTypeEnum.QUOTE_REJECTED },
    deferNotifyRejectSentData.get(),
    null,
    async ({ data }) => {
      const notificationPreferenceRepo = getConnection(
        'MASTER_CONNECTION_CONF',
      ).getRepository(OemNotificationPreference);

      const notificationRepo = getConnection(
        'MASTER_CONNECTION_CONF',
      ).getRepository(OemNotification);

      const notification = await notificationRepo.findOne({
        where: {
          quoteId: data[0].quoteId,
          receiverId: data[0].receiverId,
          notificationType: OemNotificationTypeEnum.QUOTE_REJECTED,
        },
        order: {
          createdAt: 'DESC',
        },
      });
      const notificationPreference = await notificationPreferenceRepo.findOne({
        where: {
          notificationId: notification.notificationId,
        },
      });

      console.log(notification, await notificationPreferenceRepo.find());
      expect(notification).toBeDefined();
      expect(notificationPreference).toBeDefined();
    },
  );

  // Notify
  DESCRIBE_ACTION_RULES_POST(
    { notificationType: OemNotificationTypeEnum.QUOTE_APPROVED },
    deferNotifyExternallySentData.get(),
    null,
    async ({ data }) => {
      const notificationRepo = getConnection(
        'MASTER_CONNECTION_CONF',
      ).getRepository(OemNotification);
      const notificationPreferenceRepo = getConnection(
        'MASTER_CONNECTION_CONF',
      ).getRepository(OemNotificationPreference);


      const notification = await notificationRepo.findOne({
        where: {
          quoteId: data[0].quoteId,
          receiverId: data[0].receiverId,
        },
      });
      const notificationPreference = await notificationPreferenceRepo.findOne({
        where: {
          notificationId: notification.notificationId,
        },
      });
      console.log(notificationPreference);
      expect(notification).toBeDefined();
    },
  );
});
