import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemUserEntity } from '../../main/oem-users/oem-user.entity';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateCleanOemUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      // The only default "User" should be demo_admin@vendori.com - will be able to access via Google or email (I have already removed unnecessary users in demo environment)
      const users: Partial<OemUserEntity>[] = [
        {
          userId: 2,
          companyId,
          geoHierarchyId: 1,
          roleId: 2,
          organizationId: 'aj7pturq',
          prePopulatedFields: ['Full Name'],
          imageUrl:
            'https://files.vendori.com/images/09f4f1e7-4111-4f17-a9d6-34a534c2e2f0.png?Expires=1705460498&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9pbWFnZXMvMDlmNGYxZTctNDExMS00ZjE3LWE5ZDYtMzRhNTM0YzJlMmYwLnBuZyIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcwNTQ2MDQ5OH19fV19&Signature=oKh9ZZjn4L1wzbZb5bRVJE1SJlQlF5~i~y4yAlfzb02I3OzNCLbFabboVRpDzOw~FkUU9nfKTofurDiQy-3x8YZTjY9JBxOJZCPKW9md7ddrWsX3pK-k8Iu1iYEjqqD77HinuyfVHKf9P5RlyEU4-jhKLHEOmB9hQ-zyZAjLsSSBq81~NsEx97gO2wBlupSJwwySLVnrOcLvIcnhcqqBuZAXaX2UH3M8bOyq8f44XUI8v-Q9SQims7xl6Aq9ofLSbzMNfrc~jg~mSXR-GiWA2uel46JQJYtPzckIMFrf2a~gsSekxxRnRV9WDbnAA~wt1QOEk2hl738GDT9bDrwxQw__&Key-Pair-Id=K3W4UV0J4B6YE7',
          firstName: 'Demo',
          lastName: 'Admin',
          notificationEmail: 'Demo_admin@vendori.com',
          ssoLoginEmail: 'Demo_admin@vendori.com',
          phone: '+1 929 271-5430',
          isExternal: false,
          region: 'New York',
          timeZoneArea: 'US/Pacific',
          isHideWelcomeText: false,
          isActive: true,
          isEnabled: true,
          companyChannelId: null,
          companyOrganisationName: null,
          // Password is not needed at this time since Vendori is a passwordless service
          // password: 'ztf*AVA0dae7jwb*zyq',
        },
      ];

      const userEntities = await seedEntities(connection, OemUserEntity, users);

      return userEntities;
    }
  };
