import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemPricingModelEntity } from '../../main/oem-pricing-models/oem-pricing-model.entity';
import { ModelTypeEnum } from '../../main/oem-pricing-models/oem-pricing-model.enums/model-type.enum';
import { PricingTypeEnum } from '../../main/oem-pricing-models/oem-pricing-model.enums/pricing-type.enum';
import { UnitDurationEnum } from '../../main/oem-pricing-models/oem-pricing-model.enums/unit-duration.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateDemoOemPricingModels implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultPricingModel: Partial<OemPricingModelEntity> = {
        companyId,
        isEnabled: true,
        tiersEnabled: true,
      };

      const pricingModels: Partial<OemPricingModelEntity>[] = [
        {
          ...defaultPricingModel,
          modelName: 'Services - Subscription',
          modelType: ModelTypeEnum.Subscription,
          pricingType: PricingTypeEnum.Flat,
          unitMetric: 'Hour',
          unitDuration: UnitDurationEnum.PER_WEEK,
        },
        {
          ...defaultPricingModel,
          modelName: 'Services - Consumption (per hour)',
          modelType: ModelTypeEnum.Consumption,
          pricingType: PricingTypeEnum.Flat,
          unitMetric: 'Hour',
          unitDuration: UnitDurationEnum.CONSUMED,
        },
        {
          ...defaultPricingModel,
          modelName: 'Software - SaaS',
          modelType: ModelTypeEnum.Subscription,
          pricingType: PricingTypeEnum.TIERED,
          unitMetric: 'User',
          unitDuration: UnitDurationEnum.PER_CALENDAR_YEAR,
        },
        {
          ...defaultPricingModel,
          modelName: 'Software - OnPremise',
          modelType: ModelTypeEnum.OneTime,
          pricingType: PricingTypeEnum.Flat,
          unitMetric: 'User',
          unitDuration: UnitDurationEnum.PER_ONE_TIME,
        },
        {
          ...defaultPricingModel,
          modelName: 'Hardware - One-Time',
          modelType: ModelTypeEnum.OneTime,
          pricingType: PricingTypeEnum.Flat,
          unitMetric: 'Unit',
          unitDuration: UnitDurationEnum.PER_ONE_TIME,
        },
      ];

      const pricingModelEntities = await seedEntities(
        connection,
        OemPricingModelEntity,
        pricingModels,
      );

      return pricingModelEntities;
    }
  };
