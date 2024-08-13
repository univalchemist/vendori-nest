import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { factory, runSeeder, useSeeding } from 'typeorm-seeding';
import { OemUserEntity } from '../../src/oem/main/oem-users/oem-user.entity';
import { OemRoleEntity } from '../../src/oem/main/oem-roles/oem-role.entity';
import { OemCompanyEntity } from '../../src/oem/main/oem-companies/oem-company.entity';
import { OemUserSerializeDto } from '../../src/oem/main/oem-users/oem-user.dto/oem-user.serialize.dto';

import CreateOemCompanies from '../../src/oem/seeds/create-oem-companies.seed';
import CreateOemRoles from '../../src/oem/seeds/create-oem-roles.seed';
import { clearDB } from '../../src/utils/clear-db.util';
import CreateOemHierarchyLevels from '../../src/oem/seeds/create-oem-hierarchy-levels.seed';
import CreateOemHierarchies from '../../src/oem/seeds/create-oem-hierarchies.seed';
import CreateOemChannels from '../../src/oem/seeds/create-oem-channels.seed';
import CreateOemCompanyPrograms from '../../src/oem/seeds/create-oem-company-programs.seed';
import CreateOemCompanyChannels from '../../src/oem/seeds/create-oem-company-channels.seed';
import { OemHierarchyLevelEntity } from '../../src/oem/main/oem-hierarchy-levels/oem-hierarchy-level.entity';
import { OemHierarchyEntity } from '../../src/oem/main/oem-hierarchies/oem-hierarchy.entity';
import initModuleFixture from '../test.utils/init-module-fixture.util';
import { initPolicy } from '../test.utils/init-policy.util';
import CreateOemAddresses from '../../src/oem/seeds/create-oem-addresses.seed';
import CreateOemCustomer from '../../src/oem/seeds/create-oem-customer.seed';
import CreateOemContacts from '../../src/oem/seeds/create-oem-contacts.seed';
import CreateOemLicensingPrograms from '../../src/oem/seeds/create-oem-licensing-programs.seed';
import { OemQuoteEntity } from '../../src/oem/main/oem-quotes/oem-quote.entity';
import { QuoteStatusEnum } from '../../src/oem/main/oem-quotes/oem-quote.enums/quote-status.enum';
import CreateOemCompanyChannelSettings from '../../src/oem/seeds/create-oem-company-channel-settings.seed';
import { omit } from 'lodash';
import { closeAllConnection } from '../test.utils/close-all-connections.util';
import initCrudTesting from '../test.utils/init-crud-tests.util';
import { METHODS } from '../test.enums/methods.enum';
import { getMetaData } from '../test.utils/get-metadata.util';
import { initNestTestApp } from '../test.utils/init-nest-app.util';
import { INestTestApp } from '../test.interfaces/nest-test-app.interface';
import { OemChannelEntity } from '../../src/oem/main/oem-channels/oem-channel.entity';
import { initDefer } from '../../src/utils/init-defer.util';

describe('UsersController (e2e)', () => {
  jest.setTimeout(50000);
  let NestAppTest: INestTestApp;
  let roles: OemRoleEntity;
  let user: OemUserEntity;
  let company: OemCompanyEntity;
  let hierarchyLevel: OemHierarchyLevelEntity;
  let hierarchy: OemHierarchyEntity;
  let receivedData: OemUserSerializeDto;
  let comparedData: Partial<OemUserEntity>;
  const EntityClass = OemUserEntity;
  const SerializeClass = OemUserSerializeDto;
  const PATH = '/users';
  const MODEL = 'user';

  const { defers, tests } = initCrudTesting({
    path: PATH,
    only: {
      ['USERS_POST_ONE']: { method: METHODS.POST, path: PATH },
    },
  });
  const { deferServer, deferComparedData, deferSentData } = defers;

  const deferNewUser = initDefer();

  const { DESCRIBE_USERS_POST_ONE } = tests;

  beforeAll(async (done) => {
    await initPolicy();
    await useSeeding();
    const moduleFixture: TestingModule = await initModuleFixture().compile();
    NestAppTest = await initNestTestApp(moduleFixture);

    /*const [
      company,
      roles,
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
      CreateOemHierarchyLevels,
      CreateOemHierarchies,
      CreateOemAddresses,
      CreateOemCustomer,
      CreateOemContacts,
      CreateOemChannels,
      CreateOemCompanyPrograms,
      CreateOemLicensingPrograms,
    ]);*/
    company = await runSeeder(CreateOemCompanies);
    roles = await runSeeder(CreateOemRoles());
    await runSeeder(CreateOemHierarchyLevels);
    await runSeeder(CreateOemHierarchies);
    await runSeeder(CreateOemAddresses);
    await runSeeder(CreateOemCustomer);
    await runSeeder(CreateOemContacts);
    const channels = await runSeeder(CreateOemChannels);
    await runSeeder(CreateOemCompanyPrograms);
    await runSeeder(CreateOemLicensingPrograms);
    await runSeeder(
      CreateOemCompanyChannelSettings(
        channels as unknown as OemChannelEntity[],
      ),
    );
    await runSeeder(CreateOemCompanyChannels);

    //await runSeeder(CreateOemQuoteCompanyChannels);
    //hierarchyLevel = await runSeeder(CreateOemHierarchyLevels);
    //hierarchy = await runSeeder(CreateOemHierarchies);
    //await runSeeder(CreateOemAddresses);

    user = await factory(OemUserEntity)().make({
      userId: 1,
    });

    await factory(OemUserEntity)().create({
      userId: 2,
      companyId: 1,
      firstName: 'TEST',
      geoHierarchyId: 1,
      roleId: 5,
      lastName: 'Vendori',
      notificationEmail: 'Demo_partner@vendori.com',
      ssoLoginEmail: 'demo@gmail.com',
      isExternal: false,
      isHideWelcomeText: false,
    });

    await factory(OemQuoteEntity)().create({
      quoteStatus: QuoteStatusEnum.PENDING_INTERNAL_APPROVAL,
      ownerUserId: 1,
    });
    await user.hashPassword();

    comparedData = omit(user, ['companyId', 'isEnabled', 'userId']);
    deferServer.resolve(NestAppTest.server);
    const overrideDeletedUser = {
      ...comparedData,
      firstName: 'FirstTest',
      lastName: 'LastTest',
    };
    deferNewUser.resolve({
      ...comparedData,
      ssoLoginEmail: 'test@vendori.com',
    });
    deferComparedData.resolve(overrideDeletedUser);
    deferSentData.resolve(overrideDeletedUser);
    done();
  });

  afterAll(async () => {
    await clearDB();
    await closeAllConnection();
    await NestAppTest.app.close();
    global.gc && global.gc();
  });

  describe(`${METHODS.POST.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.POST;
    it(`should ${getMetaData(method).action} a ${MODEL}`, (done) => {
      return request(NestAppTest.server)
        [method](PATH)
        .set('Origin', 'demo.localhost')
        .send({ ...comparedData, companyOrganisationName: 'Test' })
        .end((_, res) => {
          console.debug(res.body);
          expect(res.status).toBe(getMetaData(method).expectedStatus);
          expect(res.body.data.companyOrganisationName).toEqual('Test');
          expect(res.body.data).toEqual(
            expect.objectContaining(new SerializeClass(comparedData)),
          );
          receivedData = res.body.data;
          done();
        });
    });
  });

  //create user with companyOrganisationName
  describe(`${METHODS.POST.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.POST;
    it(`should ${getMetaData(method).action} a ${MODEL}`, (done) => {
      return request(NestAppTest.server)
        [method](PATH)
        .set('Origin', 'demo.localhost')
        .send({ ...comparedData, companyOrganisationName: 'Test' })
        .end((_, res) => {
          console.debug(res.body);
          expect(res.status).toBe(422);
          done();
        });
    });
  });

  describe(`${METHODS.GET.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.GET;
    it(`should ${getMetaData(method).action} a ${MODEL}`, (done) => {
      return request(NestAppTest.server)
        [method](PATH)
        .set('Origin', 'demo.localhost')
        .end((_, res) => {
          // delete comparedData.password;
          console.debug(res.body, new SerializeClass(comparedData));
          expect(res.status).toBe(getMetaData(method).expectedStatus);
          expect(res.body.data).toEqual(
            expect.arrayContaining([
              expect.objectContaining(new SerializeClass(comparedData)),
            ]),
          );
          done();
        });
    });
  });

  describe(`${METHODS.PATCH.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.PATCH;
    it(`should ${getMetaData(method).action} a ${MODEL}`, (done) => {
      return request(NestAppTest.server)
        [method](PATH + '/' + receivedData.userId)
        .set('Origin', 'demo.localhost')
        .send({ firstName: 'Jack', roleId: 2, companyChannelId: 1 })
        .end((_, res) => {
          console.debug(res.body);
          expect(res.status).toBe(getMetaData(method).expectedStatus);
          expect(res.body.data).toEqual(
            expect.objectContaining({
              firstName: 'Jack',
              roleId: 2,
              companyChannelId: 1,
            }),
          );
          done();
        });
    });
  });

  describe(`${METHODS.PUT.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.PUT;
    it(`should ${getMetaData(method).action} a ${MODEL}`, async (done) => {
      comparedData = await factory(EntityClass)().make({
        userId: receivedData.userId,
      });
      comparedData.geoHierarchyId = 2;
      await comparedData.hashPassword();
      comparedData = omit(comparedData, [
        'companyId',
        'isEnabled',
        'userId',
        // 'password',
      ]);
      const res = await request(NestAppTest.server)
        [method](PATH + '/' + receivedData.userId)
        .set('Origin', 'demo.localhost')
        .send(comparedData);
      // delete comparedData.password;
      console.debug(res.body);
      expect(res.status).toBe(getMetaData(method).expectedStatus);
      expect(res.body.data).toEqual(
        expect.objectContaining(new SerializeClass(comparedData)),
      );
      done();
    });
  });

  describe(`${METHODS.GET.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.GET;
    it(`should ${getMetaData(method).action} a ${MODEL}`, (done) => {
      return request(NestAppTest.server)
        [method](PATH + '/' + receivedData.userId)
        .set('Origin', 'demo.localhost')
        .end((_, res) => {
          console.debug(res.body);
          expect(res.status).toBe(getMetaData(method).expectedStatus);
          expect(res.body.data).toEqual(
            expect.objectContaining(new SerializeClass(comparedData)),
          );
          done();
        });
    });
  });

  describe(`${METHODS.DELETE.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.DELETE;
    it(`should ${getMetaData(method).action} a ${MODEL}`, async (done) => {
      const res = await request(NestAppTest.server)
        [method](PATH + '/' + 1)
        .set('Origin', 'demo.localhost');
      console.debug(res.body);
      expect(res.status).toBe(422);
      done();
    });
  });

  describe(`${METHODS.DELETE.toUpperCase()} ${PATH}`, () => {
    const method = METHODS.DELETE;
    it(`should ${getMetaData(method).action} a ${MODEL}`, async (done) => {
      const res = await request(NestAppTest.server)
        [method](PATH + '/' + receivedData.userId + '?replaceUserId=1')
        .set('Origin', 'demo.localhost');
      console.debug(res.body);
      expect(res.status).toBe(getMetaData(method).expectedStatus);
      done();
    });
  });

  //override deleted user
  DESCRIBE_USERS_POST_ONE(deferComparedData.get(), deferSentData.get());

  //new user
  DESCRIBE_USERS_POST_ONE(deferNewUser.get(), deferNewUser.get());
});
