import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemPriceTierEntity } from '../../main/oem-price-tiers/oem-price-tier.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { UnitTier } from '../../main/oem-unit-tiers/oem-unit-tier.entity';
import { Product } from '../../main/oem-products/oem-product.entity';

export default ({
  companyId = 1,
  unitTiers = [],
  products = [],
}: {
  companyId?: number;
  unitTiers: UnitTier[];
  products: Product[];
}) =>
  class CreateDemoOemPriceTiers implements Seeder {
    getProductByName(name: string): number {
      return products.filter((p) => p.productName === name)[0].productId;
    }

    getUnitTierByProductName(name: string, tierName: string): number {
      return unitTiers.filter((p) => {
        const product = products.filter(
          (product) => product.productName === name,
        )[0];

        return (
          product.pricingModelId === p.pricingModelId &&
          (tierName ? p.unitTierName === tierName : true)
        );
      })[0].unitTierId;
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultPriceTier: Partial<OemPriceTierEntity> = {
        isEnabled: true,
        companyId,
      };

      const priceTiers = [
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Onshore_Dev_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Onshore_Dev_1'),
          cogsUnit: 50,
          priceUnit: 80,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Onshore_Architect_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Onshore_Architect_1'),
          cogsUnit: 60,
          priceUnit: 100,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Nearshore_Dev_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Nearshore_Dev_1'),
          cogsUnit: 30,
          priceUnit: 60,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Nearshore_Architect_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Nearshore_Architect_1'),
          cogsUnit: 30,
          priceUnit: 75,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Offshore_Dev_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Offshore_Dev_1'),
          cogsUnit: 20,
          priceUnit: 45,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Offshore_Architect_1',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Offshore_Architect_1'),
          cogsUnit: 30,
          priceUnit: 50,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Standard',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_SaaS-Standard'),
          cogsUnit: 15,
          priceUnit: 100,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Standard',
            'Tier 2',
          ),
          productId: this.getProductByName('Demo_SaaS-Standard'),
          cogsUnit: 15,
          priceUnit: 90,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Standard',
            'Tier 3',
          ),
          productId: this.getProductByName('Demo_SaaS-Standard'),
          cogsUnit: 15,
          priceUnit: 80,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Standard',
            'Tier 4',
          ),
          productId: this.getProductByName('Demo_SaaS-Standard'),
          cogsUnit: 15,
          priceUnit: 70,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Standard',
            'Tier 5',
          ),
          productId: this.getProductByName('Demo_SaaS-Standard'),
          cogsUnit: 15,
          priceUnit: 60,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-License',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_OnPremise-License'),
          cogsUnit: 30,
          priceUnit: 200,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Premium',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_SaaS-Premium'),
          cogsUnit: 15,
          priceUnit: 150,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Premium',
            'Tier 2',
          ),
          productId: this.getProductByName('Demo_SaaS-Premium'),
          cogsUnit: 15,
          priceUnit: 140,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Premium',
            'Tier 3',
          ),
          productId: this.getProductByName('Demo_SaaS-Premium'),
          cogsUnit: 15,
          priceUnit: 130,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Premium',
            'Tier 4',
          ),
          productId: this.getProductByName('Demo_SaaS-Premium'),
          cogsUnit: 15,
          priceUnit: 120,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_SaaS-Premium',
            'Tier 5',
          ),
          productId: this.getProductByName('Demo_SaaS-Premium'),
          cogsUnit: 15,
          priceUnit: 110,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName('Demo_Computer', 'Tier 1'),
          productId: this.getProductByName('Demo_Computer'),
          cogsUnit: 250,
          priceUnit: 500,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName('Demo_Monitor', 'Tier 1'),
          productId: this.getProductByName('Demo_Monitor'),
          cogsUnit: 50,
          priceUnit: 200,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_Hourly-Support_Consumption',
            'Tier 1',
          ),
          productId: this.getProductByName('Demo_Hourly-Support_Consumption'),
          cogsUnit: 35,
          priceUnit: 150,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Standard',
            'Tier 1',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Standard',
          ),
          cogsUnit: 35,
          priceUnit: 110,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Standard',
            'Tier 2',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Standard',
          ),
          cogsUnit: 35,
          priceUnit: 100,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Standard',
            'Tier 3',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Standard',
          ),
          cogsUnit: 35,
          priceUnit: 90,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Standard',
            'Tier 4',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Standard',
          ),
          cogsUnit: 35,
          priceUnit: 80,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Standard',
            'Tier 5',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Standard',
          ),
          cogsUnit: 35,
          priceUnit: 70,
        },
        {
          ...defaultPriceTier,
          unitTierId: this.getUnitTierByProductName(
            'Demo_OnPremise-Maintenance_Premium',
            'Tier 1',
          ),
          productId: this.getProductByName(
            'Demo_OnPremise-Maintenance_Premium',
          ),
          cogsUnit: 35,
          priceUnit: 190,
        },
      ];

      const priceTierEntities = await seedEntities(
        connection,
        OemPriceTierEntity,
        priceTiers,
      );

      return priceTierEntities;
    }
  };
