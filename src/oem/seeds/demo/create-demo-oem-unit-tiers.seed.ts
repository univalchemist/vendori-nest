import { Factory, Seeder } from 'typeorm-seeding';
import { OemUnitTierEntity } from '../../main/oem-unit-tiers/oem-unit-tier.entity';
import { Connection } from 'typeorm';
import { seedEntities } from '../../../utils/seed-factory.util';
import { OemPricingModelEntity } from '../../main/oem-pricing-models/oem-pricing-model.entity';

export default ({
  companyId = 1,
  pricingModels = [],
}: {
  companyId?: number;
  pricingModels: OemPricingModelEntity[];
}) =>
  class CreateDemoOemUnitTiers implements Seeder {
    getPricingModelByName(pricingModelName: string): number {
      return pricingModels.filter((p) => p.modelName === pricingModelName)[0]
        .pricingModelId;
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultUnitTier: Partial<OemUnitTierEntity> = {
        isEnabled: true,
        companyId,
      };

      const unitTiers: Partial<OemUnitTierEntity>[] = [
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
          unitTierName: 'Tier 1',
          startRange: 1,
          endRange: 205,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
          unitTierName: 'Tier 2',
          startRange: 206,
          endRange: 300,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
          unitTierName: 'Tier 3',
          startRange: 301,
          endRange: 400,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
          unitTierName: 'Tier 4',
          startRange: 401,
          endRange: 500,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
          unitTierName: 'Tier 5',
          startRange: 501,
          endRange: 9007199254740991,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
          unitTierName: 'Tier 1',
          startRange: 1,
          endRange: 9007199254740991,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Software - OnPremise'),
          unitTierName: 'Tier 1',
          startRange: 1,
          endRange: 9007199254740991,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName(
            'Services - Consumption (per hour)',
          ),
          unitTierName: 'Tier 1',
          startRange: 1,
          endRange: 9007199254740991,
        },
        {
          ...defaultUnitTier,
          pricingModelId: this.getPricingModelByName('Hardware - One-Time'),
          unitTierName: 'Tier 1',
          startRange: 1,
          endRange: 9007199254740991,
        },
      ];

      const unitTierEntities = await seedEntities(
        connection,
        OemUnitTierEntity,
        unitTiers,
      );

      return unitTierEntities;
    }
  };
