import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemRoleEntity } from '../../main/oem-roles/oem-role.entity';

import { RoleTypeEnum } from '../../main/oem-roles/oem-role.enums/role-type.enum';
import { DataAccessEnum } from '../../main/oem-roles/oem-role.enums/data-access.enum';
import { CreateAccessEnum } from '../../main/oem-roles/oem-role.enums/create-access.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateDemoOemRoles implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultRole: Partial<OemRoleEntity> = {
        companyId,
        isActive: true,
        isExportRight: true,
        isEnabled: true,
      };

      const roles: Partial<OemRoleEntity>[] = [
        {
          ...defaultRole,
          priority: 1,
          roleName: 'Admin',
          roleType: RoleTypeEnum.ADMIN,
          dataAccess: DataAccessEnum.ALL,
          createAccess: CreateAccessEnum.ALL,
        },
        {
          ...defaultRole,
          priority: 2,
          roleName: 'External',
          roleType: RoleTypeEnum.QUOTE_CREATOR,
          dataAccess: DataAccessEnum.ASSIGNED_ONLY,
          createAccess: CreateAccessEnum.ALL,
          isExportRight: false,
        },
        {
          ...defaultRole,
          priority: 3,
          roleName: 'Deal Desk',
          roleType: RoleTypeEnum.WORKFLOW_APPROVER,
          dataAccess: DataAccessEnum.TEAM_SUB_HIERARCHY,
          createAccess: CreateAccessEnum.ALL,
        },
        {
          ...defaultRole,
          priority: 4,
          roleName: 'Sales Mgt.',
          roleType: RoleTypeEnum.WORKFLOW_APPROVER,
          dataAccess: DataAccessEnum.ALL,
          createAccess: CreateAccessEnum.ALL,
        },
        {
          ...defaultRole,
          priority: 5,
          roleName: 'Sales',
          roleType: RoleTypeEnum.QUOTE_CREATOR,
          dataAccess: DataAccessEnum.ASSIGNED_ONLY,
          createAccess: CreateAccessEnum.ALL,
          isExportRight: false,
        },
        {
          ...defaultRole,
          priority: 6,
          roleName: 'C-Suite',
          roleType: RoleTypeEnum.WORKFLOW_APPROVER,
          dataAccess: DataAccessEnum.ASSIGNED_ONLY,
          createAccess: CreateAccessEnum.VIEW_ONLY,
          isExportRight: false,
        },
      ];

      const roleEntities = await seedEntities(connection, OemRoleEntity, roles);

      return roleEntities;
    }
  };
