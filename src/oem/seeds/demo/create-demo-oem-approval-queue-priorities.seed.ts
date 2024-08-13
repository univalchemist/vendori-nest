import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemApprovalQueuePriority } from '../../main/oem-approval-queue-priorities/oem-approval-queue-priority.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { OemRoleEntity } from '../../main/oem-roles/oem-role.entity';
import { RoleTypeEnum } from '../../main/oem-roles/oem-role.enums/role-type.enum';

export default ({
  companyId = 1,
  roles = [],
}: {
  companyId?: number;
  roles: OemRoleEntity[];
}) =>
  class CreateDemoOemApprovalQueuePriorities implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultApprovalQueuePriority: Partial<OemApprovalQueuePriority> = {
        companyId,
        isActive: true,
        isEnabled: true,
      };

      const approvalQueuePriorities: Partial<OemApprovalQueuePriority>[] = [
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.WORKFLOW_APPROVER,
          )[0].roleId,
          priority: 2,
        },
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.WORKFLOW_APPROVER,
          )[1].roleId,
          priority: 1,
        },
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.WORKFLOW_APPROVER,
          )[2].roleId,
          priority: 3,
        },
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter((r) => r.roleType == RoleTypeEnum.ADMIN)[0]
            .roleId,
          priority: 4,
          isActive: false,
        },
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[0].roleId,
          priority: 5,
          isActive: false,
        },
        {
          ...defaultApprovalQueuePriority,
          roleId: roles.filter(
            (r) => r.roleType == RoleTypeEnum.QUOTE_CREATOR,
          )[1].roleId,
          priority: 6,
          isActive: false,
        },
      ];

      const approvalQueuePriorityEntities = await seedEntities(
        connection,
        OemApprovalQueuePriority,
        approvalQueuePriorities,
      );

      return approvalQueuePriorityEntities;
    }
  };
