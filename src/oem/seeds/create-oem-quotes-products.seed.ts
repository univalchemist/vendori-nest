import { Factory, Seeder } from 'typeorm-seeding';
import { OemQuotesProducts } from '../intermediaries/_oem-quotes-products/oem-quotes-products.entity';
import { Connection } from 'typeorm';

export default class CreateOemQuotesProducts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Disable creating sensitive seed data for now
    if (
      process.env.NODE_ENV === 'staging' ||
      process.env.NODE_ENV === 'production'
    )
      return Promise.resolve();

    const quoteProduct1 = await factory(OemQuotesProducts)().create({
      lockedFields: {
        cogs: 0,
        days: 366,
        weeks: 53,
        years: 2,
        months: 13,
        endDate: '2023-07-28T00:00:00.000Z',
        product: {
          term: 2,
          termType: 'years',
          upgrades: [],
          companyId: 1,
          createdAt: '2022-07-28T13:58:21.091Z',
          isEnabled: true,
          productId: 2,
          skuNumber: "QA's auto",
          updatedAt: '2022-07-28T13:58:21.091Z',
          downgrades: [],
          priceTiers: [
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 9007199254740991,
                companyId: 1,
                createdAt: '2022-07-28T13:56:44.511Z',
                isEnabled: true,
                updatedAt: '2022-07-28T13:56:44.511Z',
                startRange: 1,
                unitTierId: 224,
                unitTierName: 'Tier 1',
                pricingModelId: 45,
              },
              companyId: 1,
              createdAt: '2022-07-28T13:58:21.522Z',
              isEnabled: true,
              priceUnit: 10233.23,
              productId: 2,
              updatedAt: '2022-07-28T13:58:21.522Z',
              unitTierId: 224,
              priceTierId: 246,
            },
          ],
          isRenewable: true,
          ownerUserId: 4,
          productName: 'Product B (one time - flat)',
          isExpandable: true,
          isUpgradable: true,
          pricingModel: {
            companyId: 1,
            createdAt: '2022-07-28T13:56:44.085Z',
            isEnabled: true,
            modelName: 'One-Time / Flat',
            modelType: 'One Time / Non-Recurring',
            updatedAt: '2022-07-28T13:56:44.085Z',
            unitMetric: 'user',
            pricingType: 'Flat',
            tiersEnabled: true,
            unitDuration: 'One-Time / Non-Recurring',
            pricingModelId: 45,
          },
          isDowngradable: true,
          pricingModelId: 45,
          billingFrequency: 'Upfront',
          productHierarchy: {
            isActive: true,
            parentId: 24,
            companyId: 1,
            createdAt: '2022-06-28T18:15:29.552Z',
            isEnabled: true,
            updatedAt: '2022-06-28T18:15:29.552Z',
            hierarchyId: 25,
            hierarchyName: 'None',
            hierarchyLevelId: 12,
          },
          productHierarchyId: 25,
          productAvailability: ['Current Product'],
          sameUnitPriceForAllTiers: false,
        },
        quantity: 100,
        discounts: {
          channel: [],
          customer: [],
        },
        listPrice: 1023323,
        startDate: '2022-07-28T00:00:00.000Z',
        priceTiers: [
          {
            cogsUnit: 0,
            unitTier: {
              endRange: 9007199254740991,
              companyId: 1,
              createdAt: '2022-07-28T13:56:44.511Z',
              isEnabled: true,
              updatedAt: '2022-07-28T13:56:44.511Z',
              startRange: 1,
              unitTierId: 224,
              unitTierName: 'Tier 1',
              pricingModelId: 45,
            },
            companyId: 1,
            createdAt: '2022-07-28T13:58:21.522Z',
            isEnabled: true,
            priceUnit: 10233.23,
            productId: 1,
            updatedAt: '2022-07-28T13:58:21.522Z',
            unitTierId: 224,
            priceTierId: 246,
          },
        ],
        termLength: 2,
        productType: 'Net New',
        renewedFrom: [],
        dealDuration: 1,
        expandedFrom: [],
        pricingModel: {
          companyId: 1,
          createdAt: '2022-07-28T13:56:44.085Z',
          isEnabled: true,
          modelName: 'One-Time / Flat',
          modelType: 'One Time / Non-Recurring',
          updatedAt: '2022-07-28T13:56:44.085Z',
          unitMetric: 'user',
          pricingType: 'Flat',
          tiersEnabled: true,
          unitDuration: 'One-Time / Non-Recurring',
          pricingModelId: 45,
        },
        unitDuration: 1,
        upgradedFrom: [],
        defaultFields: {
          termLength: 2,
        },
        downgradedFrom: [],
        perUnitPerYear: 766.0176659929635,
        perUnitUpfront: 0,
        partnerDiscount: 0.1,
        perUnitConsumed: 766.0176659929635,
        quoteProductUuid: '34d88673-2534-4979-a5ce-0580e4d028f4',
        grossMarginDollar: 1023323,
        netPriceToChannel: 1023323,
        impliedCustomerPrice: 1023323,
        discretionaryDiscount: 0.1,
        grossMarginPercentage: 1,
        relativeNetPriceDollar: 0,
        listPricePerUnitDuration: 1023323,
        relativeNetPricePercentage: 0,
        relativeCustomerPriceDollar: 0,
        totalChannelProgramDiscount: 0.2,
        currentCustomerProductListPrice: 0,
        relativeCustomerPricePercentage: 0,
        daysFromQuoteExpirationToStartDate: -76,
      },
    });

    const quoteProduct2 = await factory(OemQuotesProducts)().create({
      lockedFields: {
        cogs: 0,
        days: 366,
        weeks: 53,
        years: 2,
        months: 13,
        endDate: '2023-07-28T00:00:00.000Z',
        product: {
          term: 2,
          termType: 'years',
          upgrades: [],
          companyId: 1,
          createdAt: '2022-07-28T13:58:21.091Z',
          isEnabled: true,
          productId: 1,
          skuNumber: "QA's auto",
          updatedAt: '2022-07-28T13:58:21.091Z',
          downgrades: [],
          priceTiers: [
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 9007199254740991,
                companyId: 1,
                createdAt: '2022-07-28T13:56:44.511Z',
                isEnabled: true,
                updatedAt: '2022-07-28T13:56:44.511Z',
                startRange: 1,
                unitTierId: 224,
                unitTierName: 'Tier 1',
                pricingModelId: 45,
              },
              companyId: 1,
              createdAt: '2022-07-28T13:58:21.522Z',
              isEnabled: true,
              priceUnit: 10233.23,
              productId: 1,
              updatedAt: '2022-07-28T13:58:21.522Z',
              unitTierId: 224,
              priceTierId: 246,
            },
          ],
          isRenewable: true,
          ownerUserId: 4,
          productName: 'Product A (one time - flat)',
          isExpandable: true,
          isUpgradable: true,
          pricingModel: {
            companyId: 1,
            createdAt: '2022-07-28T13:56:44.085Z',
            isEnabled: true,
            modelName: 'One-Time / Flat',
            modelType: 'One Time / Non-Recurring',
            updatedAt: '2022-07-28T13:56:44.085Z',
            unitMetric: 'user',
            pricingType: 'Flat',
            tiersEnabled: true,
            unitDuration: 'One-Time / Non-Recurring',
            pricingModelId: 45,
          },
          isDowngradable: true,
          pricingModelId: 45,
          billingFrequency: 'Upfront',
          productHierarchy: {
            isActive: true,
            parentId: 24,
            companyId: 1,
            createdAt: '2022-06-28T18:15:29.552Z',
            isEnabled: true,
            updatedAt: '2022-06-28T18:15:29.552Z',
            hierarchyId: 25,
            hierarchyName: 'None',
            hierarchyLevelId: 12,
          },
          productHierarchyId: 25,
          productAvailability: ['Current Product'],
          sameUnitPriceForAllTiers: false,
        },
        quantity: 100,
        discounts: {
          channel: [],
          customer: [],
        },
        listPrice: 1023323,
        startDate: '2022-07-28T00:00:00.000Z',
        priceTiers: [
          {
            cogsUnit: 0,
            unitTier: {
              endRange: 9007199254740991,
              companyId: 1,
              createdAt: '2022-07-28T13:56:44.511Z',
              isEnabled: true,
              updatedAt: '2022-07-28T13:56:44.511Z',
              startRange: 1,
              unitTierId: 224,
              unitTierName: 'Tier 1',
              pricingModelId: 45,
            },
            companyId: 1,
            createdAt: '2022-07-28T13:58:21.522Z',
            isEnabled: true,
            priceUnit: 10233.23,
            productId: 1,
            updatedAt: '2022-07-28T13:58:21.522Z',
            unitTierId: 224,
            priceTierId: 246,
          },
        ],
        termLength: 2,
        productType: 'Net New',
        renewedFrom: [],
        dealDuration: 1,
        expandedFrom: [],
        pricingModel: {
          companyId: 1,
          createdAt: '2022-07-28T13:56:44.085Z',
          isEnabled: true,
          modelName: 'One-Time / Flat',
          modelType: 'One Time / Non-Recurring',
          updatedAt: '2022-07-28T13:56:44.085Z',
          unitMetric: 'user',
          pricingType: 'Flat',
          tiersEnabled: true,
          unitDuration: 'One-Time / Non-Recurring',
          pricingModelId: 45,
        },
        unitDuration: 1,
        upgradedFrom: [],
        defaultFields: {
          termLength: 2,
        },
        downgradedFrom: [],
        perUnitPerYear: 766.0176659929635,
        perUnitUpfront: 0,
        partnerDiscount: 0.1,
        perUnitConsumed: 766.0176659929635,
        quoteProductUuid: '34d88673-2534-4979-a5ce-0580e4d028f4',
        grossMarginDollar: 1023323,
        netPriceToChannel: 1023323,
        impliedCustomerPrice: 1023323,
        discretionaryDiscount: 0.1,
        grossMarginPercentage: 1,
        relativeNetPriceDollar: 0,
        listPricePerUnitDuration: 1023323,
        relativeNetPricePercentage: 0,
        relativeCustomerPriceDollar: 0,
        totalChannelProgramDiscount: 0.2,
        currentCustomerProductListPrice: 0,
        relativeCustomerPricePercentage: 0,
        daysFromQuoteExpirationToStartDate: -76,
      },
    });

    return [quoteProduct1, quoteProduct2];
  }
}
