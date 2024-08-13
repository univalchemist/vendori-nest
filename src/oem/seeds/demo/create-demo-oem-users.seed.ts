import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemUserEntity } from '../../main/oem-users/oem-user.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { OemRoleEntity } from '../../main/oem-roles/oem-role.entity';

import { RoleTypeEnum } from '../../main/oem-roles/oem-role.enums/role-type.enum';
import { OemHierarchyEntity } from '../../main/oem-hierarchies/oem-hierarchy.entity';
import { NODE_ENV } from '../../../environments';

export default ({
  companyId,
  subdomain,
  roles = [],
  hierarchies = [],
}: {
  companyId: number;
  subdomain: string;
  roles: OemRoleEntity[];
  hierarchies: OemHierarchyEntity[];
}) =>
  class CreateDemoOemUsers implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const sfUserIds =
        NODE_ENV === 'staging'
          ? [
              '005Dn0000078zHLIAY', // Beth
              '005Dn000004Wfc6IAC', // Ethan
              '005Dn00000794VdIAI', // Oscar
            ]
          : [
              '005Dn0000078zHLIAY', // Beth
              '005Dn000004Wfc6IAC', // Ethan
              '005Dn00000794VdIAI', // Oscar
              '003DN000004qadLYAQ', // umer
              '005DN000000HmMtYAK', // Demo
              '003DN000003TxxLYAS', // Mike
            ];

      const defaultUser: Partial<OemUserEntity> = {
        companyId,
        geoHierarchyId: hierarchies[0].hierarchyId,
        roleId: roles.filter((r) => r.roleType == RoleTypeEnum.ADMIN)[0].roleId,
        organizationId: 'a6xir2hq',
        prePopulatedFields: ['Full Name'],
        imageUrl: 'https://demo.vendori.com/images/default-user-image.png',
        firstName: 'Demo',
        lastName: 'Admin',
        notificationEmail: 'Demo_admin@vendori.com',
        ssoLoginEmail: 'Demo_admin@vendori.com',
        phone: '+1 (234) 567-8900',
        isExternal: false,
        region: 'New York',
        timeZoneArea: 'America/New_York',
        isHideWelcomeText: false,
        isActive: true,
        isEnabled: true,
        companyChannelId: null,
        companyOrganisationName: null,
      };

      const devUsers = [
        {
          ...defaultUser,
          firstName: 'Oscar',
          lastName: 'BNT',
          notificationEmail: 'oscar@vendori.com',
          ssoLoginEmail: 'oscar@vendori.com',
          sfUserId: sfUserIds[2],
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Granit',
          lastName: 'PM',
          notificationEmail: 'granit@bloodandtreasure.com',
          ssoLoginEmail: 'granit@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Vadym',
          lastName: 'API',
          notificationEmail: 'vadym@bloodandtreasure.com',
          ssoLoginEmail: 'vadym@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Jovie',
          lastName: 'API',
          notificationEmail: 'jovie@bloodandtreasure.com',
          ssoLoginEmail: 'jovie@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Kostya',
          lastName: 'Frontend',
          notificationEmail: 'kostya@bloodandtreasure.com',
          ssoLoginEmail: 'kostya@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Andrii',
          lastName: 'Frontend',
          notificationEmail: 'andy.k@bloodandtreasure.com',
          ssoLoginEmail: 'andy.k@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'John',
          lastName: 'QA',
          notificationEmail: 'john@bloodandtreasure.com',
          ssoLoginEmail: 'john@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Rich',
          lastName: 'TW',
          notificationEmail: 'rich@bloodandtreasure.com',
          ssoLoginEmail: 'rich@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Christine',
          lastName: 'TW',
          notificationEmail: 'christine@bloodandtreasure.com',
          ssoLoginEmail: 'christine@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Noel',
          lastName: 'MP',
          notificationEmail: 'noel@bloodandtreasure.com',
          ssoLoginEmail: 'noel@bloodandtreasure.com',
        },
        {
          ...defaultUser,
          ...(!['staging', 'mock'].includes(NODE_ENV) && {
            isActive: false,
            isEnabled: false,
          }),
          firstName: 'Chris',
          lastName: 'MP',
          notificationEmail: 'chris@bloodandtreasure.com',
          ssoLoginEmail: 'chris@bloodandtreasure.com',
        },
      ];

      const vendoriUsers = [
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Sales',
          lastName: 'User',
          notificationEmail: 'demo_sales@vendori.com',
          ssoLoginEmail: 'demo_sales@vendori.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Oscar',
          lastName: 'Vendori',
          notificationEmail: 'oscar+vendori+1@bloodandtreasure.com',
          ssoLoginEmail: 'oscar+vendori+1@bloodandtreasure.com',
          enabled: false,
        },

        {
          ...defaultUser,
          firstName: 'Ethan',
          lastName: 'Garonzik',
          notificationEmail: 'ethan@vendori.com',
          ssoLoginEmail: 'ethan@vendori.com',
          sfUserId: sfUserIds[1],
        },
        {
          ...defaultUser,
          firstName: 'Beth',
          lastName: 'Waldman',
          notificationEmail: 'beth@vendori.com',
          ssoLoginEmail: 'beth@vendori.com',
          sfUserId: sfUserIds[0],
        },
        {
          ...defaultUser,
          firstName: 'Phil',
          lastName: 'Naess',
          notificationEmail: 'phil@vendori.com',
          ssoLoginEmail: 'phil@vendori.com',
        },
        {
          ...defaultUser,
          firstName: 'Brian',
          lastName: 'Ferber',
          notificationEmail: 'brian@vendori.com',
          ssoLoginEmail: 'brian@vendori.com',
        },
      ];

      const vendoriGrowthAdviserUsers = [
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Beth',
          lastName: 'Waldman',
          notificationEmail: 'bwaldman@icebergtechconsulting.com',
          ssoLoginEmail: 'bwaldman@icebergtechconsulting.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Whitney',
          lastName: 'Daily',
          notificationEmail: 'whitney.daily@gmail.com',
          ssoLoginEmail: 'whitney.daily@gmail.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Joost',
          lastName: 'Rutten',
          notificationEmail: 'joostrutten@gmail.com',
          ssoLoginEmail: 'joostrutten@gmail.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Andrew',
          lastName: 'Brockoff',
          notificationEmail: 'andrew.brockhoff@gmail.com',
          ssoLoginEmail: 'andrew.brockhoff@gmail.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Jopp',
          lastName: '14',
          notificationEmail: 'Jopp14@gmail.com',
          ssoLoginEmail: 'Jopp14@gmail.com',
        },
      ];

      const tenPearlsUsers = [
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Umer',
          lastName: 'Vinte',
          notificationEmail: 'umer.farooq2@10pearls.com',
          ssoLoginEmail: 'umer.farooq2@10pearls.com',
        },
        {
          ...defaultUser,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          firstName: 'Zaid',
          lastName: 'Ali',
          notificationEmail: 'zaid.ali.vendori@10pearls.com',
          ssoLoginEmail: 'zaid.ali.vendori@10pearls.com',
        },
      ];

      const users: Partial<OemUserEntity>[] = [
        ...(subdomain !== 'app' && subdomain !== 'app1' ? [defaultUser] : []),

        ...(subdomain === 'localhost' ||
        subdomain === 'localhost1' ||
        subdomain === 'staging1' ||
        subdomain === 'vercel-admin'
          ? devUsers
          : []),

        ...(subdomain === 'staging'
          ? [...devUsers, ...vendoriUsers, ...tenPearlsUsers]
          : []),

        ...(subdomain === 'mock'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) =>
                ['Ethan', 'Brian', 'Beth'].includes(u.firstName),
              ),
            ]
          : []),

        ...(subdomain === 'mock1'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) =>
                ['Ethan', 'Brian', 'Beth'].includes(u.firstName),
              ),
            ]
          : []),

        ...(subdomain === 'demo'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) =>
                ['Ethan', 'Phil', 'Brian', 'Beth'].includes(u.firstName),
              ),
            ]
          : []),

        ...(subdomain === 'growth'
          ? [
              ...devUsers,
              ...vendoriGrowthAdviserUsers,
              ...vendoriUsers.filter((u) => ['Ethan'].includes(u.firstName)),
            ]
          : []),

        ...(subdomain === 'phil'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) => ['Phil'].includes(u.firstName)),
            ]
          : []),

        ...(subdomain === 'ethan'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) => ['Ethan'].includes(u.firstName)),
            ]
          : []),

        ...(subdomain === 'brian'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) => ['Brian'].includes(u.firstName)),
            ]
          : []),

        ...(subdomain === 'beth'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) => ['Beth'].includes(u.firstName)),
            ]
          : []),

        ...(subdomain === 'app'
          ? [
              ...devUsers,
              ...vendoriUsers.filter((u) =>
                ['Ethan', 'Phil', 'Brian', 'Beth'].includes(u.firstName),
              ),
            ]
          : []),

        ...(subdomain === 'app1' ? devUsers : []),
      ];

      const userEntities = await seedEntities(connection, OemUserEntity, users);

      return userEntities;
    }
  };
