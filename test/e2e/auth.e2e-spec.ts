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
import { omit } from 'lodash';

describe('Auth Controller (e2e)', () => {
  jest.setTimeout(50000);
  let NestAppTest: INestTestApp;
  let comparedData: Partial<OemUserEntity>;
  const PATH = '/sessions';
  const USERS_PATH = '/users';

  const { defers, tests } = initCrudTesting({
    path: PATH,
    only: {
      ['ACCOUNTS_GET_ALL']: {
        method: METHODS.GET,
        path: PATH + '/my-accounts',
      },
      ['ME_GET']: { method: METHODS.GET, path: PATH + '/me' },
      ['USERS_POST_ONE']: {
        method: METHODS.POST,
        path: USERS_PATH,
      },
      ['USERS_PATCH']: { method: METHODS.PATCH, path: USERS_PATH },
    },
  });
  const { deferServer, deferComparedData, deferSentData } = defers;

  const deferSentXCompany = initDefer();
  const deferComparedXCompany = initDefer();
  const deferSentUserSales = initDefer();
  const deferSentUserSalesUpdate = initDefer();
  const deferSentUserAdmin = initDefer();
  const deferSentUserAdminUpdate = initDefer();

  const {
    DESCRIBE_ACCOUNTS_GET_ALL,
    DESCRIBE_ME_GET,
    DESCRIBE_USERS_POST_ONE,
    DESCRIBE_USERS_PATCH,
  } = tests;

  beforeAll(async () => {
    await initPolicy();
    await useSeeding();
    const moduleFixture: TestingModule = await initModuleFixture({
      overrideGuards: [SessionAuthGuard],
    }).compile();
    NestAppTest = await initNestTestApp(moduleFixture);

    const roles = [];
    const companies = [];
    const companyNames = ['demo', 'clean'];
    for (const companyName of companyNames) {
      const company = await factory(OemCompanyEntity)().create({
        companyName: companyName,
        subdomain: companyName,
        emailDomain: companyName,
      });
      roles.push(
        await runSeeder(CreateOemRoles({ companyId: company.companyId })),
      );
      companies.push(company);
    }

    const [hierarchyLevels, hierarchies] = await RunMultipleSeeds([
      CreateOemHierarchyLevels,
      CreateOemHierarchies,
    ]);

    const userDemo = await factory(OemUserEntity)().create({
      ssoLoginEmail: 'test_user@vendori.com',
      companyId: companies[0].companyId,
      roleId: roles[0].roleId,
      isExternal: false,
      isActive: true,
    });

    const userAdminDemo = await factory(OemUserEntity)().create({
      ssoLoginEmail: 'admin_user@vendori.com',
      companyId: companies[0].companyId,
      roleId: 1,
      isExternal: false,
      isActive: true,
    });

    const userClean = await factory(OemUserEntity)().create({
      ssoLoginEmail: 'test_user@vendori.com',
      companyId: companies[1].companyId,
      roleId: roles[1].roleId,
      isExternal: false,
      isActive: true,
    });

    await factory(OemUserEntity)().create();
    comparedData = userDemo;

    const authService = moduleFixture.get<AuthService>(AuthService);

    const access_token = (await authService.loginUser(userDemo)).access_token;

    const access_token_admin = (await authService.loginUser(userAdminDemo))
      .access_token;

    deferSentUserSales.resolve({
      headers: {
        ['x-company']: companies[0].subdomain,
      },
      access_token: (await authService.loginUser(userDemo)).access_token,
      body: {
        ...omit(await factory(OemUserEntity)().make({}), [
          'companyId',
          'isEnabled',
          'userId',
        ]),
      },
    });

    deferSentUserSalesUpdate.resolve({
      headers: {
        ['x-company']: companies[0].subdomain,
      },
      access_token: (await authService.loginUser(userDemo)).access_token,
      body: {
        firstName: 'update',
        //geoHierarchyId: 2,
      },
    });

    deferServer.resolve(NestAppTest.server);
    deferSentData.resolve({
      headers: {
        ['x-company']: companies[0].subdomain,
      },
      access_token: access_token,
    });
    deferComparedData.resolve({ companyId: companies[0].companyId });
    deferComparedXCompany.resolve({ companyId: companies[1].companyId });
  });

  afterAll(async () => {
    await clearDB();
    await closeAllConnection();
    await NestAppTest.app.close();
    global.gc && global.gc();
  });

  // check sessions
  DESCRIBE_ME_GET(deferComparedData.get(), deferSentData.get());
  DESCRIBE_ACCOUNTS_GET_ALL(null, deferSentData.get(), null, (data) => {
    deferSentXCompany.resolve({
      access_token: data?.sentData?.access_token,
      headers: { ['x-company']: data?.data[1].subdomain },
    });
  });
  DESCRIBE_ME_GET(deferComparedXCompany.get(), deferSentXCompany.get());

  // check permission for Sales (Workflow Approver)
  // shouldn't post
  DESCRIBE_USERS_POST_ONE({ status: 403, body: {} }, deferSentUserSales.get());
  // should patch
  DESCRIBE_USERS_PATCH(
    { status: 200, body: {} },
    deferSentUserSalesUpdate.get(),
    '/users/1',
  );
});
