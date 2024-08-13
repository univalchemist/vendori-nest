import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemProductEntity } from '../../main/oem-products/oem-product.entity';
import { TermTypeEnum } from '../../main/oem-products/oem-product.enums/term-type.enum';
import { BillingFrequencyEnum } from '../../main/oem-products/oem-product.enums/billing-frequency.enum';
import { ProductAvailabilityEnum } from '../../main/oem-products/oem-product.enums/product-availability.enum';
import { seedEntities } from '../../../utils/seed-factory.util';
import { EligibleForEnum } from '../../main/oem-products/oem-product.enums/eligible-for.enum';
import { PricingModel } from '../../main/oem-pricing-models/oem-pricing-model.entity';
import { Hierarchy } from '../../main/oem-hierarchies/oem-hierarchy.entity';
import { BundleEntity } from '../../main/oem-bundles/oem-bundle.entity';
import { NODE_ENV } from '../../../environments';

export default ({
  companyId = 1,
  pricingModels = [],
  hierarchies = [],
  ownerUserId = 1,
}: {
  companyId: number;
  pricingModels: PricingModel[];
  hierarchies: Hierarchy[];
  ownerUserId: number;
}) =>
  class CreateDemoOemProducts implements Seeder {
    getHierarchyByName(hierarchylName: string): number {
      return hierarchies.filter((p) => p.hierarchyName === hierarchylName)[0]
        .hierarchyId;
    }

    getPricingModelByName(pricingModelName: string): number {
      return pricingModels.filter((p) => p.modelName === pricingModelName)[0]
        .pricingModelId;
    }

    getProductByName(
      products: Partial<OemProductEntity>[],
      productName: string,
    ) {
      return products.filter((p) => p.productName === productName)[0].productId;
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const sfProductIds =
        NODE_ENV === 'staging'
          ? {
              Demo_Computer: '01tDN000000GC4YYAW',
              'Demo_Hourly-Support_Consumption': '01tDN000000GC4sYAG',
              Demo_Monitor: '01tDN000000GC4dYAG',
              Demo_Nearshore_Architect_1: '01tDN000000GC4PYAW',
              Demo_Nearshore_Dev_1: '01tDN000000GC4OYAW',
              Demo_Offshore_Architect_1: '01tDN000000GC4JYAW',
              Demo_Offshore_Dev_1: '01tDN000000GC2XYAW',
              'Demo_OnPremise-License': '01tDN000000GC4TYAW',
              'Demo_OnPremise-Maintenance_Premium': '01tDN000000GC4nYAG',
              'Demo_OnPremise-Maintenance_Standard': '01tDN000000GC4iYAG',
              Demo_Onshore_Architect_1: '01tDN000000GC4xYAG',
              Demo_Onshore_Dev_1: '01tDN000000GC2SYAW',
              'Demo_SaaS-Premium': '01tDN000000GC52YAG',
              'Demo_SaaS-Standard': '01tDN000000GC2JYAW',
            }
          : {
              Demo_Computer: '01tDO000000F9QBYA0',
              'Demo_Hourly-Support_Consumption': '01tDO000000F9OoYAK',
              Demo_Monitor: '01tDO000000F9OeYAK',
              Demo_Nearshore_Architect_1: '01tDO000000F9OtYAK',
              Demo_Nearshore_Dev_1: '01tDO000000F9QLYA0',
              Demo_Offshore_Architect_1: '01tDO000000F9OyYAK',
              Demo_Offshore_Dev_1: '01tDO000000F9QGYA0',
              'Demo_OnPremise-License': '01tDO000000F9QfYAK',
              'Demo_OnPremise-Maintenance_Premium': '01tDO000000F9QVYA0',
              'Demo_OnPremise-Maintenance_Standard': '01tDO000000F9QpYAK',
              Demo_Onshore_Architect_1: '01tDO000000F9QQYA0',
              Demo_Onshore_Dev_1: '01tDO000000F9OkYAK',
              'Demo_SaaS-Premium': '01tDO000000F9OjYAK',
              'Demo_SaaS-Standard': '01tDO000000F9QkYAK',
            };

      const defaultProduct: Partial<OemProductEntity | any> = {
        companyId,
        type: 'Product',

        ownerUserId,
        pricingModelId: pricingModels[0].pricingModelId,
        productHierarchyId: hierarchies[0].hierarchyId,
        skuNumber: 'SKU-015',
        productName: 'Quicken',
        term: 3,
        termType: TermTypeEnum.YEARS,
        sameUnitPriceForAllTiers: true,
        billingFrequency: BillingFrequencyEnum.ANNUALLY,
        productAvailability: [ProductAvailabilityEnum.CURRENT_PRODUCT],
        eligibleFor: [
          EligibleForEnum.EXPANSION,
          EligibleForEnum.EXTENSION,
          EligibleForEnum.RENEWAL,
          EligibleForEnum.CANCELLATION_TERMINATION,
          EligibleForEnum.UPGRADEABLE,
          EligibleForEnum.DOWNGRADEBLE,
        ],
        isEnabled: true,
      };
      const defaultBundle: Partial<BundleEntity | any> = {
        ...defaultProduct,
        type: 'BundleEntity',
      };

      const products: Partial<OemProductEntity | any>[] = [
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Standard'),
          ownerUserId,
          skuNumber: 'SKU-014',
          productName: 'Demo_SaaS-Standard',
          sfProductId: sfProductIds['Demo_SaaS-Standard'],
          term: 3,
          sameUnitPriceForAllTiers: true,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Computers'),
          ownerUserId,
          skuNumber: 'SKU-013',
          productName: 'Demo_Computer',
          sfProductId: sfProductIds['Demo_Computer'],
          term: 1,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.UPFRONT,
          pricingModelId: this.getPricingModelByName('Hardware - One-Time'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Peripherals'),
          ownerUserId,
          skuNumber: 'SKU-012',
          productName: 'Demo_Monitor',
          sfProductId: sfProductIds['Demo_Monitor'],
          term: 1,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.UPFRONT,
          pricingModelId: this.getPricingModelByName('Hardware - One-Time'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Onshore'),
          ownerUserId,
          skuNumber: 'SKU-011',
          productName: 'Demo_Hourly-Support_Consumption',
          sfProductId: sfProductIds['Demo_Hourly-Support_Consumption'],
          term: 1,
          sameUnitPriceForAllTiers: true,
          pricingModelId: this.getPricingModelByName(
            'Services - Consumption (per hour)',
          ),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Premium'),
          ownerUserId,
          skuNumber: 'SKU-010',
          productName: 'Demo_OnPremise-License',
          sfProductId: sfProductIds['Demo_OnPremise-License'],
          term: 1,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.UPFRONT,
          pricingModelId: this.getPricingModelByName('Software - OnPremise'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Standard'),
          ownerUserId,
          skuNumber: 'SKU-009',
          productName: 'Demo_OnPremise-Maintenance_Standard',
          sfProductId: sfProductIds['Demo_OnPremise-Maintenance_Standard'],
          term: 3,
          sameUnitPriceForAllTiers: true,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
        },
        {
          productHierarchyId: this.getHierarchyByName('Premium'),
          ownerUserId,
          skuNumber: 'SKU-008',
          productName: 'Demo_OnPremise-Maintenance_Premium',
          sfProductId: sfProductIds['Demo_OnPremise-Maintenance_Premium'],
          term: 3,
          termType: TermTypeEnum.YEARS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Architect (Sr.)'),
          ownerUserId,
          skuNumber: 'SKU-007',
          productName: 'Demo_Nearshore_Architect_1',
          sfProductId: sfProductIds['Demo_Nearshore_Architect_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Architect (Sr.)'),
          ownerUserId,
          skuNumber: 'SKU-006',
          productName: 'Demo_Offshore_Architect_1',
          sfProductId: sfProductIds['Demo_Offshore_Architect_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Developer (Jr.)'),
          ownerUserId,
          skuNumber: 'SKU-005',
          productName: 'Demo_Nearshore_Dev_1',
          sfProductId: sfProductIds['Demo_Nearshore_Dev_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Developer (Jr.)'),
          ownerUserId,
          skuNumber: 'SKU-004',
          productName: 'Demo_Onshore_Architect_1',
          sfProductId: sfProductIds['Demo_Onshore_Architect_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Developer (Jr.)'),
          ownerUserId,
          skuNumber: 'SKU-003',
          productName: 'Demo_Onshore_Dev_1',
          sfProductId: sfProductIds['Demo_Onshore_Dev_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          productHierarchyId: this.getHierarchyByName('Developer (Jr.)'),
          ownerUserId,
          skuNumber: 'SKU-002',
          productName: 'Demo_Offshore_Dev_1',
          sfProductId: sfProductIds['Demo_Offshore_Dev_1'],
          eligibleFor: [EligibleForEnum.EXPANSION, EligibleForEnum.EXTENSION],
          term: 2,
          termType: TermTypeEnum.MONTHS,
          sameUnitPriceForAllTiers: true,
          billingFrequency: BillingFrequencyEnum.WEEKLY,
          pricingModelId: this.getPricingModelByName('Services - Subscription'),
        },
        {
          ...defaultProduct,
          productHierarchyId: this.getHierarchyByName('Premium'),
          ownerUserId,
          skuNumber: 'SKU-SP1',
          productName: 'Demo_SaaS-Premium',
          sfProductId: sfProductIds['Demo_SaaS-Premium'],
          term: 3,
          sameUnitPriceForAllTiers: true,
          pricingModelId: this.getPricingModelByName('Software - SaaS'),
        },
      ];

      const productEntities = await seedEntities(
        connection,
        OemProductEntity,
        products,
      );

      const bundles: Partial<BundleEntity | any>[] = [
        {
          ...defaultBundle,
          productHierarchyId: this.getHierarchyByName('Standard'),
          ownerUserId,
          skuNumber: 'SKU-B001',
          bundleName: 'Demo_OnPremise_StdBundle',
          companyId,
          eligibleFor: [
            EligibleForEnum.EXPANSION,
            EligibleForEnum.EXTENSION,
            EligibleForEnum.RENEWAL,
            EligibleForEnum.CANCELLATION_TERMINATION,
            EligibleForEnum.UPGRADEABLE,
            EligibleForEnum.DOWNGRADEBLE,
          ],
          bundleSettings: [
            {
              productId: this.getProductByName(
                products,
                'Demo_OnPremise-License',
              ),
              isEditable: true,
              defaultQuantity: 1,
            },
            {
              productId: this.getProductByName(
                products,
                'Demo_OnPremise-Maintenance_Standard',
              ),
              isEditable: true,
              defaultQuantity: 1,
            },
          ],
        },

        {
          ...defaultBundle,
          productHierarchyId: this.getHierarchyByName('Hardware'),
          ownerUserId,
          skuNumber: 'SKU-B002',
          bundleName: 'Demo_Computer-Monitor_Bundle',
          companyId,
          eligibleFor: [
            EligibleForEnum.EXPANSION,
            EligibleForEnum.EXTENSION,
            EligibleForEnum.RENEWAL,
            EligibleForEnum.CANCELLATION_TERMINATION,
            EligibleForEnum.UPGRADEABLE,
            EligibleForEnum.DOWNGRADEBLE,
          ],
          bundleSettings: [
            {
              productId: this.getProductByName(products, 'Demo_Computer'),
              isEditable: true,
              defaultQuantity: 1,
            },
            {
              productId: this.getProductByName(products, 'Demo_Monitor'),
              isEditable: true,
              defaultQuantity: 1,
            },
          ],
        },
      ];

      // console.log(
      //   'bundles',
      //   bundles.map((b) => b.bundleSettings),
      // );

      const bundleEntities = await seedEntities(
        connection,
        BundleEntity,
        bundles,
      );

      return [...productEntities, ...bundleEntities];
    }
  };
