import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemShadingRule } from '../../main/oem-rules/oem-shading-rules/oem-shading-rule.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { User } from '../../main/oem-users/oem-user.entity';

export default ({
  companyId = 1,
  users = [],
}: {
  companyId?: number;
  users: User[];
}) =>
  class CreateDemoOemShadingRulesSeed implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultShadingRule: Partial<OemShadingRule> = {
        companyId,
        ownerUserId: users[0].userId,
        priority: 1,
        isActive: true,
        isEnabled: true,
        startDate: new Date(),
        endDate: null,
      };

      const shadingRules: Partial<OemShadingRule>[] = [
        {
          ...defaultShadingRule,
          priority: 4,
          shadingRuleName: 'Demo_GM_Under25%_Yellow',
          shadingRuleLogic: {
            antecedent: [
              {
                unit: '%',
                scope: 'a Gross margin',
                value: '26',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a quote being created',
                operationCriteria: 'Less than',
              },
            ],
            consequent: [
              {
                value: '',
                matchRule: 'Should',
                shadingType: 'yellow',
                scopeCriteria: 'The violating item(s) should highlight',
              },
            ],
          } as any,
        },
        {
          ...defaultShadingRule,
          priority: 5,
          shadingRuleName: 'Demo_GMUnder0%_Red',
          shadingRuleLogic: {
            antecedent: [
              {
                unit: '%',
                scope: 'a Gross margin',
                value: '0',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a quote being created',
                operationCriteria: 'Less than',
              },
            ],
            consequent: [
              {
                value: '',
                matchRule: 'Should',
                shadingType: 'red',
                scopeCriteria: 'The violating item(s) should highlight',
              },
            ],
          } as any,
        },
        {
          ...defaultShadingRule,
          priority: 2,
          shadingRuleName: 'Demo_QTYOver150_Red',
          shadingRuleLogic: {
            antecedent: [
              {
                unit: 'Units',
                scope: 'a Quantity',
                value: '150',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a quote being created',
                operationCriteria: 'Greater than',
              },
            ],
            consequent: [
              {
                value: '',
                matchRule: 'Should',
                shadingType: 'red',
                scopeCriteria: 'The violating item(s) should highlight',
              },
            ],
          } as any,
        },
        {
          ...defaultShadingRule,
          priority: 3,
          shadingRuleName: 'Demo_QtyOver100_Yellow',
          shadingRuleLogic: {
            antecedent: [
              {
                unit: 'Units',
                scope: 'a Quantity',
                value: '100',
                valueTo: '150',
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a quote being created',
                operationCriteria: 'Between',
              },
            ],
            consequent: [
              {
                value: '',
                matchRule: 'Should',
                shadingType: 'yellow',
                scopeCriteria: 'The violating item(s) should highlight',
              },
            ],
          } as any,
        },
        {
          ...defaultShadingRule,
          priority: 1,
          shadingRuleName: 'Demo_InvoiceSched_Yellow',
          shadingRuleLogic: {
            antecedent: [
              {
                unit: 'The Default Setting',
                scope: 'a Billing / Payment Structure',
                value: '',
                valueTo: null,
                matchRule: 'Contains',
                scopeCriteria: 'A line item in a quote being created',
                operationCriteria: 'Not Equal To',
              },
            ],
            consequent: [
              {
                value: '',
                matchRule: 'Should',
                shadingType: 'yellow',
                scopeCriteria: 'The violating item(s) should highlight',
              },
            ],
          } as any,
        },
      ];

      const shadingRuleEntities = await seedEntities(
        connection,
        OemShadingRule,
        shadingRules,
      );

      return shadingRuleEntities;
    }
  };
