import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { factory, runSeeder, useSeeding } from 'typeorm-seeding';
import { HttpExceptionFilter } from '../../src/common/filters/http-exception.filter';
import { ResponseInterceptor } from '../../src/common/interceptors/response.interceptor';
import { useContainer } from 'class-validator';
import CreateOemCompanies from '../../src/oem/seeds/create-oem-companies.seed';
import { clearDB } from '../../src/utils/clear-db.util';
import initModuleFixture from '../test.utils/init-module-fixture.util';
import { initPolicy } from '../test.utils/init-policy.util';

import { closeAllConnection } from '../test.utils/close-all-connections.util';
import { OemSalesforceIntegrationDto } from '../../src/oem/main/oem-integrations/oem-salesforce-integrations/oem-salesforce-integration.dto/oem-salesforce-integration.dto';
import * as _ from 'lodash';
import initCrudTesting from '../test.utils/init-crud-tests.util';
import { initDefer } from '../../src/utils/init-defer.util';

describe('Salesforce Syncing (e2e)', () => {
  jest.setTimeout(50000);

  let app: INestApplication;
  let server: any;

  const QUOTE_PATH = '/quotes'; // Need to test quote products, products and assets also
  const updateData = {
    salesforceClientSecret: 'Test',
  };
  const deferPath = initDefer();

  const { defers, tests } = initCrudTesting({ path: QUOTE_PATH });
  const { deferServer, deferComparedData, deferSentData } = defers;

  const [
    DESCRIBE_GET_ALL,
    DESCRIBE_GET,
    DESCRIBE_POST,
    DESCRIBE_PATCH,
    DESCRIBE_PUT,
    DESCRIBE_DELETE,
  ] = tests;

  beforeAll(async (done) => {
    await initPolicy();
    await useSeeding();
    await runSeeder(CreateOemCompanies);
    const moduleFixture: TestingModule = await initModuleFixture().compile();

    app = moduleFixture.createNestApplication();
    useContainer(app, { fallbackOnErrors: true });
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes();

    const sentData = await factory(OemSalesforceIntegrationDto)().make({
      salesforceIntegrationId: 1,
    });

    const comparedData = _.omit(sentData, [
      'salesforceClientSecret',
      'salesforcePassword',
    ]);

    await app.init();

    server = app.getHttpServer();

    deferServer.resolve(server);
    deferComparedData.resolve(comparedData);
    deferSentData.resolve(sentData);
    deferPath.resolve(QUOTE_PATH + '/' + comparedData.salesforceIntegrationId);

    done();
  });

  afterAll(async () => {
    await clearDB();
    await closeAllConnection();
    await app.close();
    global.gc && global.gc();
  });

  // 1. Connect to Salesforce.
  // 2. Get an opportunity on Salesforce.
  // 3. Create a quote from the opportunity.
  // {
  //   "quoteInternalCommentFiles": [],
  //   "dealType": "Direct",
  //   "currency": "USD",
  //   "isAcceptingCreditCard": false,
  //   "isDistributorVisible": false,
  //   "isResellerVisible": false,
  //   "isExternalHideInvoice": false,
  //   "isExternalHideUnit": true,
  //   "isExternalHideContact": false,
  //   "netAmount": 0,
  //   "isLocked": false,
  //   "isExternal": false,
  //   "isBlackBox": false,
  //   "quoteInternalComments": "",
  //   "quoteComments": "",
  //   "ownerUserId": 4,
  //   "expiresAt": "2023-05-20T07:00:00.000Z",
  //   "isRequiringSigning": true,
  //   "quoteAttributes": [
  //     {
  //       "name": "Net New",
  //       "value": false
  //     },
  //     {
  //       "name": "Expansion",
  //       "value": false
  //     },
  //     {
  //       "name": "Renewal",
  //       "value": false
  //     },
  //     {
  //       "name": "Custom Billing",
  //       "value": false
  //     },
  //     {
  //       "name": "Custom Discount",
  //       "value": false
  //     }
  //   ],
  //   "geoHierarchyId": 1,
  //   "opportunityId": "006DN000002K5EdYAK",
  //   "quoteName": "Oscar Test #9",
  //   "customerId": null,
  //   "sfMetaData": {
  //     "account": {
  //       "AccountId": "001DN000003w5BfYAI",
  //       "Name": "Global Media (Sample)",
  //       "Industry": "Media",
  //       "Phone": "1 (800) 667-6389",
  //       "Website": "https://codepen.io",
  //       "PhotoUrl": "/services/images/photo/0015f00000LihGxAAJ",
  //       "BillingStreet": "null",
  //       "BillingCity": "null",
  //       "BillingState": "null",
  //       "BillingPostalCode": "null",
  //       "BillingCountry": "US",
  //       "BillingLatitude": null,
  //       "BillingLongitude": null,
  //       "BillingGeocodeAccuracy": null,
  //       "ShippingCity": "null",
  //       "ShippingState": "null",
  //       "ShippingPostalCode": "null",
  //       "ShippingCountry": "US",
  //       "ShippingLatitude": null,
  //       "ShippingLongitude": null,
  //       "ShippingGeocodeAccuracy": null
  //     },
  //     "partners": []
  //   }
  // }
  DESCRIBE_POST(deferComparedData.get(), deferSentData.get());

  // 1. Get the existing primary quote created above
  // 2. Update the status & add a contact
  DESCRIBE_PATCH(
    { salesforceClientSecretLast4: 'Test' },
    updateData,
    deferPath.get(),
  );

  // DESCRIBE_GET(deferComparedData.get());
  // DESCRIBE_GET_ALL(deferComparedData.get());
  // DESCRIBE_PUT(deferComparedData.get(), deferSentData.get(), deferPath.get());
  // DESCRIBE_DELETE(null, null, deferPath.get());
});
