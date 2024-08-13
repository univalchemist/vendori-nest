import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemWorkflowRule } from '../../main/oem-rules/oem-workflow-rules/oem-workflow-rule.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { User } from '../../main/oem-users/oem-user.entity';
import { OemProductEntity } from '../../main/oem-products/oem-product.entity';

export default ({
  companyId = 1,
  users = [],
  products = [],
}: {
  companyId?: number;
  users: User[];
  products: OemProductEntity[];
}) =>
  class CreateDemoOemWorkflowRules implements Seeder {
    getProductByName(productName: string) {
      return products.filter((p) => p.productName === productName)[0].productId;
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultWorkflowRule: Partial<OemWorkflowRule> = {
        companyId,
        ownerUserId: users[0].userId,
        isActive: true,
        isEnabled: true,
      };

      const workflowRules: Partial<OemWorkflowRule>[] = [
        {
          ...defaultWorkflowRule,
          workflowRuleName: 'Catchall - No Approver',
          workflowRuleLogic: {
            antecedent: [
              {
                unit: 'Units',
                scope: 'a Quantity',
                value: '0',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a submitted quote',
                operationCriteria: 'Greater than',
              },
            ],
            consequent: [
              {
                value: [users[0].userId],
                scopeCriteria: 'Route for approval to',
                operationCriteria: null,
              },
            ],
          } as any,
          isCatchall: true,
        },
        {
          ...defaultWorkflowRule,
          workflowRuleName: 'Demo_SaaSProducts_Over$1m',
          workflowRuleLogic: {
            antecedent: [
              {
                unit: '$',
                scope: 'a Net value',
                value: '1000000',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a submitted quote',
                operationCriteria: 'Greater than',
              },
              {
                unit: null,
                scope: 'The following products',
                value: [
                  this.getProductByName('Demo_SaaS-Standard'),
                  this.getProductByName('Demo_SaaS-Premium'),
                ],
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'The same line item',
                operationCriteria: 'Equal To',
              },
            ],
            consequent: [
              {
                value: [users[0].userId],
                scopeCriteria: 'Route for approval to',
                operationCriteria: null,
              },
            ],
          } as any,
        },
      ];

      const workflowRuleEntities = await seedEntities(
        connection,
        OemWorkflowRule,
        workflowRules,
      );

      return workflowRuleEntities;
    }
  };
