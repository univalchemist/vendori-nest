export const defaultVendo = {
  vendoId: 69,
  ownerUserId: 1,
  companyId: 1,
  customerId: 1,
  geoHierarchyId: 1,
  quoteUuid: 'V-249933072',
  opportunityId: 'dxa-test-vendo',
  vendoName: 'Default Export Vendo',
  netAmount: 32032000,
  vendoStatus: 'Draft',
  vendoComments: 'This is simple Vendo comment',
  expiresAt: '2022-09-20T00:00:00.000Z',
  submittedAt: '2022-09-14T09:56:13.739Z',
  pdfFileUrl: null,
  excelFileUrl: null,
  isExternal: false,
  isLocked: false,
  isDistributorVisible: false,
  isResellerVisible: false,
  isEnabled: true,
  createdAt: '2022-09-14T09:43:57.897Z',
  updatedAt: '2022-09-14T09:56:13.737Z',
  vendosUsers: [
    {
      companyId: 1,
      quoteId: 68,
      userId: 1,
      type: 'Internal',
      isOwner: true,
      isApprover: false,
      approvalStatus: null,
      isSavedAlertUser: false,
      isWorkflowUser: true,
      isEnabled: true,
      createdAt: '2022-09-14T09:43:58.316Z',
      updatedAt: '2022-09-14T09:43:58.316Z',
      user: {
        userId: 1,
        companyId: 1,
        geoHierarchyId: 1,
        roleId: 1,
        organizationId: 'abrjqfhp',
        prePopulatedFields: ['Full Name'],
        imageUrl: 'https://demo.vendori.com/images/default-user-image.png',
        firstName: 'Demo',
        lastName: 'Admin',
        notificationEmail: 'Demo_admin@vendori.com',
        ssoLoginEmail: 'Demo_admin@vendori.com',
        phone: '+1 929 274-9267',
        isExternal: false,
        region: 'New York',
        timeZoneArea: 'US/Pacific',
        isHideWelcomeText: false,
        isActive: true,
        isEnabled: true,
        createdAt: '2022-09-14T09:43:58.316Z',
        updatedAt: '2022-09-14T09:43:58.316Z',
        companyChannelId: null,
      },
    },
  ],
  geoHierarchy: {
    companyId: 1,
    hierarchyId: 1,
    hierarchyLevelId: 1,
    parentId: 1,
    hierarchyName: 'North America',
    isEnabled: true,
    isActive: true,
    createdAt: '2022-09-01T17:18:44.350Z',
    updatedAt: '2022-09-01T17:18:44.350Z',
  },
  customer: {
    customerId: 1,
    companyId: 1,
    licensingProgramId: 1,
    organizationId: '49ff4263-93bc-49d7-8296-2d48eb4e1b43',
    salesOrganizationId: 'acf84179-973a-4e0b-9de8-5cbec2592f81',
    customerName: 'JaysonTerry',
    industry: 'Vehicle',
    customerEmail: 'Karlee99@gmail.com',
    logoUrl: 'https://placeimg.com/640/480',
    phone: '+1 929 275-8021',
    addressId: 1,
    isEnabled: true,
    createdAt: '2022-09-01T17:19:06.394Z',
    updatedAt: '2022-09-01T17:19:06.394Z',
    customerAddresses: [
      {
        address: {
          addressId: 1,
          companyId: 1,
          address_1: 'Apt. 353',
          address_2: 'Apt. 176',
          address_3: 'Suite 202',
          city: 'East Phyllis',
          zipCode: '31173',
          region: 'Florida',
          country: 'Cambridgeshire',
          phone: '+1 929 275-3616',
          email: 'Conrad_Lakin55@yahoo.com',
          addressType: 'Billing',
          createdAt: '2022-09-01T17:18:40.237Z',
          updatedAt: '2022-09-01T17:18:40.237Z',
        },
      },
      {
        address: {
          addressId: 1,
          companyId: 1,
          address_1: 'Apt. 354',
          address_2: 'Apt. 177',
          address_3: 'Suite 203',
          city: 'East Phyllis',
          zipCode: '31173',
          region: 'Florida',
          country: 'Cambridgeshire',
          phone: '+1 929 275-3617',
          email: 'Conrad_Lakin56@yahoo.com',
          addressType: 'Shipping',
          isEnabled: true,
          createdAt: '2022-09-01T17:18:40.237Z',
          updatedAt: '2022-09-01T17:18:40.237Z',
        },
      },
    ],
  },
  vendosContacts: [
    {
      companyId: 1,
      vendoId: 69,
      contactId: 75,
      position: 1,
      type: 'Internal',
      createdAt: '2022-09-14T09:43:58.625Z',
      updatedAt: '2022-09-14T09:43:58.625Z',
      isEnabled: true,
      isOwner: true,
      contact: {
        contactId: 75,
        companyId: 1,
        companyName: 'Staging LLC 11',
        jobTitle: 'Internal',
        lastName: 'Admin',
        firstName: 'Mike',
        contactEmail: 'Demo_admin@vendori.com',
        phone: '+1234567890',
        isEnabled: true,
        createdAt: '2022-09-14T09:43:58.294Z',
        updatedAt: '2022-09-14T09:43:58.294Z',
      },
    },
  ],
  daysSinceSubmission: '0 day(s)',
};

export const defaultCompany = {
  companyId: 1,
  companyName: 'Staging LLC 11',
  subdomain: 'staging',
  websiteUrl: 'https://compnaywebsite.vendori.com',
  emailDomain: 'bloodandtreasure,vendori',
  companyEmail: 'Myrtice4@yahoo.com',
  logoUrl: 'https://loremflickr.com/640/480/business-logo',
  defaultQuoteExpiration: '4',
  bankName: 'Bank of America',
  bankAccountNumber: '23782905008839154',
  bankRoutingNumber: '000011112222',
  phone: '779-233-4773',
  dealAttributes: [
    'Net New',
    'Expansion',
    'Renewal',
    'Custom Billing',
    'Custom Discount 2',
  ],
  settings: {
    customListPriceName: 'List Price',
    customCustomerPriceName: 'Price To Customer',
    companyPrimaryColor: {
      r: 74,
      g: 137,
      b: 187,
      a: 1,
    },
  },
  permitCreditCards: 'All Products',
  isPermitSigning: true,
  isEnabled: true,
  createdAt: '2022-09-01T17:18:40.128Z',
  updatedAt: '2022-09-01T17:18:40.128Z',
};

export const defaultCompanyAddress = {
  addressId: 1,
  companyId: 1,
  address_1: 'Apt. 444',
  address_2: 'Suite 756',
  address_3: 'Apt. 257',
  city: 'Gaylordfort',
  zipCode: '72474',
  region: 'California',
  country: 'Buckinghamshire',
  phone: '+1 929 278-2240',
  email: 'Yoshiko_Witting@yahoo.com',
  isBilling: true,
  isShipping: false,
  isEnabled: true,
  createdAt: '2022-09-01T17:18:40.237Z',
  updatedAt: '2022-09-01T17:18:40.237Z',
};

export const defaultVendoQuotes = [
  {
    quoteId: 23,
    ownerUserId: 1,
    companyId: 1,
    customerId: 1,
    geoHierarchyId: 1,
    quoteUuid: 'Q-984729573',
    opportunityId: 'dxa-test-quote-1',
    quoteName: 'Default Export Quote ',
    netAmount: 1162140,
    quoteStatus: 'Draft',
    dealType: 'Direct',
    currency: 'USD',
    quoteComments: 'Hello! This is my simple comment for the quote with id 23.',
    quoteInternalComments: '',
    quoteInternalCommentFiles: [],
    quotesProducts: [
      {
        companyId: 1,
        quoteProductId: 13,
        productId: 2,
        quoteId: 25,
        endDate: '2023-10-21T00:00:00.000Z',
        startDate: '2022-10-21T00:00:00.000Z',
        quantity: 1000,
        customerProductUuid: null,
        lockedFields: {
          cogs: 0,
          days: 1,
          weeks: 0,
          years: 0.002777777777777778,
          months: 0.03333333333333333,
          endDate: '2022-10-21T00:00:00.000Z',
          product: {
            term: 1,
            addons: [],
            termType: 'years',
            upgrades: [],
            companyId: 1,
            createdAt: '2022-10-20T09:40:22.698Z',
            isEnabled: true,
            productId: 2,
            skuNumber: 'sku-b',
            updatedAt: '2022-10-20T09:40:22.698Z',
            downgrades: [],
            priceTiers: [
              {
                cogsUnit: 0,
                unitTier: {
                  endRange: 9007199254740991,
                  companyId: 1,
                  createdAt: '2022-10-20T09:39:42.048Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T09:39:42.048Z',
                  startRange: 1,
                  unitTierId: 4,
                  unitTierName: 'Tier 1',
                  pricingModelId: 2,
                },
                companyId: 1,
                createdAt: '2022-10-20T09:40:23.067Z',
                isEnabled: true,
                priceUnit: 10.14,
                productId: 2,
                updatedAt: '2022-10-20T09:40:23.067Z',
                unitTierId: 4,
                priceTierId: 4,
              },
            ],
            isRenewable: true,
            ownerUserId: 2,
            productName: 'Product B (one-time)',
            isExpandable: true,
            isUpgradable: false,
            pricingModel: {
              companyId: 1,
              createdAt: '2022-10-20T09:39:41.671Z',
              isEnabled: true,
              modelName: 'One-time model (flat type)',
              modelType: 'One Time / Non-Recurring',
              updatedAt: '2022-10-20T09:39:41.671Z',
              unitMetric: 'quantity',
              pricingType: 'Flat',
              tiersEnabled: true,
              unitDuration: 'One-Time / Non-Recurring',
              pricingModelId: 2,
            },
            isDowngradable: false,
            pricingModelId: 2,
            billingFrequency: 'Every 30 Days',
            productHierarchy: {
              isActive: true,
              parentId: 24,
              companyId: 1,
              createdAt: '2022-10-19T17:22:36.908Z',
              isEnabled: true,
              updatedAt: '2022-10-19T17:22:36.908Z',
              hierarchyId: 25,
              hierarchyName: 'None',
              hierarchyLevelId: 12,
            },
            productHierarchyId: 25,
            productAvailability: 'Current Product',
            sameUnitPriceForAllTiers: true,
          },
          quantity: 1000,
          discounts: {
            channel: [
              {
                channel_program_discount: 0,
              },
              {
                channel_discretionary_discount: 0,
              },
            ],
            customer: [
              {
                customer_program_discount_: 0,
              },
              {
                customer_discretionary_discount: 0,
              },
            ],
          },
          listPrice: 10140,
          startDate: '2022-10-21T00:00:00.000Z',
          priceTiers: [
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 9007199254740991,
                companyId: 1,
                createdAt: '2022-10-20T09:39:42.048Z',
                isEnabled: true,
                updatedAt: '2022-10-20T09:39:42.048Z',
                startRange: 1,
                unitTierId: 4,
                unitTierName: 'Tier 1',
                pricingModelId: 2,
              },
              companyId: 1,
              createdAt: '2022-10-20T09:40:23.067Z',
              isEnabled: true,
              priceUnit: 10.14,
              productId: 2,
              updatedAt: '2022-10-20T09:40:23.067Z',
              unitTierId: 4,
              priceTierId: 4,
            },
          ],
          termLength: 0.002777777777777778,
          productType: 'Net New',
          renewedFrom: [],
          dealDuration: 1,
          expandedFrom: [],
          pricingModel: {
            companyId: 1,
            createdAt: '2022-10-20T09:39:41.671Z',
            isEnabled: true,
            modelName: 'One-time model (flat type)',
            modelType: 'One Time / Non-Recurring',
            updatedAt: '2022-10-20T09:39:41.671Z',
            unitMetric: 'quantity',
            pricingType: 'Flat',
            tiersEnabled: true,
            unitDuration: 'One-Time / Non-Recurring',
            pricingModelId: 2,
          },
          unitDuration: 1,
          upgradedFrom: [],
          defaultFields: {
            termLength: 0.002777777777777778,
          },
          downgradedFrom: [],
          perUnitPerYear: 'N/A',
          perUnitUpfront: 10.14,
          partnerDiscount: 0.1,
          perUnitConsumed: 'N/A',
          quoteProductUuid: '7851cd94-1adb-4091-95b0-c8853c0a0070',
          grossMarginDollar: 10140,
          netPriceToChannel: 10140,
          impliedCustomerPrice: 10140,
          discretionaryDiscount: 0.1,
          grossMarginPercentage: 1,
          relativeNetPriceDollar: 0,
          listPricePerUnitDuration: 10140,
          relativeNetPricePercentage: 0,
          relativeCustomerPriceDollar: 0,
          totalChannelProgramDiscount: 0.2,
          currentCustomerProductNetPrice: 0,
          currentCustomerProductListPrice: 0,
          relativeCustomerPricePercentage: 0,
          daysFromQuoteExpirationToStartDate: -4,
          currentCustomerProductDefaultNetPrice: 0,
          currentCustomerProductDefaultListPrice: 0,
        },
        invoiceSchedule: {
          prices: {
            '10/21/2022': 10140,
          },
          paymentDates: ['10/21/2022'],
          defaultFields: {
            currentBillingFrequency: 'Every 31 Days',
          },
          currentBillingFrequency: 'Every 31 Days',
          defaultBillingFrequency: 'Every 31 Days',
        },
        paymentTerm: '10 Net 10 Days',
        isLocked: false,
        isEnabled: true,
        createdAt: '2022-10-21T10:30:52.996Z',
        updatedAt: '2022-10-21T10:30:52.996Z',
        product: {
          productId: 2,
          companyId: 1,
          productHierarchyId: 25,
          ownerUserId: 2,
          pricingModelId: 2,
          skuNumber: 'sku-b',
          productName: 'Product B (one-time)',
          term: 1,
          termType: 'years',
          sameUnitPriceForAllTiers: true,
          billingFrequency: 'Every 30 Days',
          productAvailability: 'Current Product',
          isExpandable: true,
          isUpgradable: false,
          isDowngradable: false,
          isRenewable: true,
          isEnabled: true,
          createdAt: '2022-10-20T09:40:22.698Z',
          updatedAt: '2022-10-20T09:40:22.698Z',
        },
      },
      {
        companyId: 1,
        quoteProductId: 14,
        productId: 3,
        quoteId: 25,
        endDate: '2023-10-21T00:00:00.000Z',
        startDate: '2022-10-21T00:00:00.000Z',
        quantity: 2000,
        customerProductUuid: null,
        lockedFields: {
          cogs: 7390,
          days: 365,
          weeks: 52,
          years: 1,
          months: 12,
          endDate: '2023-10-20T00:00:00.000Z',
          product: {
            term: 1,
            addons: [],
            termType: 'years',
            upgrades: [],
            companyId: 1,
            createdAt: '2022-10-20T10:07:39.167Z',
            isEnabled: true,
            productId: 3,
            skuNumber: 'sku-c',
            updatedAt: '2022-10-20T10:07:39.167Z',
            downgrades: [],
            priceTiers: [
              {
                cogsUnit: 1,
                unitTier: {
                  endRange: 100,
                  companyId: 1,
                  createdAt: '2022-10-20T10:06:49.279Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T10:06:49.279Z',
                  startRange: 1,
                  unitTierId: 5,
                  unitTierName: 'Tier 1',
                  pricingModelId: 3,
                },
                companyId: 1,
                createdAt: '2022-10-20T10:07:39.587Z',
                isEnabled: true,
                priceUnit: 50,
                productId: 3,
                updatedAt: '2022-10-20T10:07:39.587Z',
                unitTierId: 5,
                priceTierId: 5,
              },
              {
                cogsUnit: 2,
                unitTier: {
                  endRange: 200,
                  companyId: 1,
                  createdAt: '2022-10-20T10:06:49.279Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T10:06:49.279Z',
                  startRange: 101,
                  unitTierId: 6,
                  unitTierName: 'Tier 2',
                  pricingModelId: 3,
                },
                companyId: 1,
                createdAt: '2022-10-20T10:07:39.587Z',
                isEnabled: true,
                priceUnit: 40,
                productId: 3,
                updatedAt: '2022-10-20T10:07:39.587Z',
                unitTierId: 6,
                priceTierId: 6,
              },
              {
                cogsUnit: 3,
                unitTier: {
                  endRange: 300,
                  companyId: 1,
                  createdAt: '2022-10-20T10:06:49.279Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T10:06:49.279Z',
                  startRange: 201,
                  unitTierId: 7,
                  unitTierName: 'Tier 3',
                  pricingModelId: 3,
                },
                companyId: 1,
                createdAt: '2022-10-20T10:07:39.587Z',
                isEnabled: true,
                priceUnit: 30,
                productId: 3,
                updatedAt: '2022-10-20T10:07:39.587Z',
                unitTierId: 7,
                priceTierId: 7,
              },
              {
                cogsUnit: 4,
                unitTier: {
                  endRange: 9007199254740991,
                  companyId: 1,
                  createdAt: '2022-10-20T10:06:49.279Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T10:06:49.279Z',
                  startRange: 301,
                  unitTierId: 8,
                  unitTierName: 'Tier 4',
                  pricingModelId: 3,
                },
                companyId: 1,
                createdAt: '2022-10-20T10:07:39.587Z',
                isEnabled: true,
                priceUnit: 20,
                productId: 3,
                updatedAt: '2022-10-20T10:07:39.587Z',
                unitTierId: 8,
                priceTierId: 8,
              },
            ],
            isRenewable: true,
            ownerUserId: 2,
            productName: 'Product C (sub)',
            isExpandable: true,
            isUpgradable: false,
            pricingModel: {
              companyId: 1,
              createdAt: '2022-10-20T10:06:48.864Z',
              isEnabled: true,
              modelName: 'Subscription model (tired type)',
              modelType: 'Subscription',
              updatedAt: '2022-10-20T10:06:48.864Z',
              unitMetric: 'user',
              pricingType: 'Tiered',
              tiersEnabled: true,
              unitDuration: 'Per Calendar Month',
              pricingModelId: 3,
            },
            isDowngradable: false,
            pricingModelId: 3,
            billingFrequency: 'Annually (Calendar)',
            productHierarchy: {
              isActive: true,
              parentId: 66,
              companyId: 1,
              createdAt: '2022-10-19T17:22:37.132Z',
              isEnabled: true,
              updatedAt: '2022-10-19T17:22:37.132Z',
              hierarchyId: 74,
              hierarchyName: 'Virtual',
              hierarchyLevelId: 10,
            },
            productHierarchyId: 74,
            productAvailability: 'Current Product',
            sameUnitPriceForAllTiers: false,
          },
          quantity: 2000,
          discounts: {
            channel: [
              {
                channel_program_discount: 0,
              },
              {
                channel_discretionary_discount: 0,
              },
            ],
            customer: [
              {
                customer_program_discount_: 0,
              },
              {
                customer_discretionary_discount: 0,
              },
            ],
          },
          listPrice: 552000,
          startDate: '2022-10-21T00:00:00.000Z',
          priceTiers: [
            {
              cogsUnit: 1,
              unitTier: {
                endRange: 100,
                companyId: 1,
                createdAt: '2022-10-20T10:06:49.279Z',
                isEnabled: true,
                updatedAt: '2022-10-20T10:06:49.279Z',
                startRange: 1,
                unitTierId: 5,
                unitTierName: 'Tier 1',
                pricingModelId: 3,
              },
              companyId: 1,
              createdAt: '2022-10-20T10:07:39.587Z',
              isEnabled: true,
              priceUnit: 50,
              productId: 3,
              updatedAt: '2022-10-20T10:07:39.587Z',
              unitTierId: 5,
              priceTierId: 5,
            },
            {
              cogsUnit: 2,
              unitTier: {
                endRange: 200,
                companyId: 1,
                createdAt: '2022-10-20T10:06:49.279Z',
                isEnabled: true,
                updatedAt: '2022-10-20T10:06:49.279Z',
                startRange: 101,
                unitTierId: 6,
                unitTierName: 'Tier 2',
                pricingModelId: 3,
              },
              companyId: 1,
              createdAt: '2022-10-20T10:07:39.587Z',
              isEnabled: true,
              priceUnit: 40,
              productId: 3,
              updatedAt: '2022-10-20T10:07:39.587Z',
              unitTierId: 6,
              priceTierId: 6,
            },
            {
              cogsUnit: 3,
              unitTier: {
                endRange: 300,
                companyId: 1,
                createdAt: '2022-10-20T10:06:49.279Z',
                isEnabled: true,
                updatedAt: '2022-10-20T10:06:49.279Z',
                startRange: 201,
                unitTierId: 7,
                unitTierName: 'Tier 3',
                pricingModelId: 3,
              },
              companyId: 1,
              createdAt: '2022-10-20T10:07:39.587Z',
              isEnabled: true,
              priceUnit: 30,
              productId: 3,
              updatedAt: '2022-10-20T10:07:39.587Z',
              unitTierId: 7,
              priceTierId: 7,
            },
            {
              cogsUnit: 4,
              unitTier: {
                endRange: 9007199254740991,
                companyId: 1,
                createdAt: '2022-10-20T10:06:49.279Z',
                isEnabled: true,
                updatedAt: '2022-10-20T10:06:49.279Z',
                startRange: 301,
                unitTierId: 8,
                unitTierName: 'Tier 4',
                pricingModelId: 3,
              },
              companyId: 1,
              createdAt: '2022-10-20T10:07:39.587Z',
              isEnabled: true,
              priceUnit: 20,
              productId: 3,
              updatedAt: '2022-10-20T10:07:39.587Z',
              unitTierId: 8,
              priceTierId: 8,
            },
          ],
          termLength: 1,
          productType: 'Net New',
          renewedFrom: [],
          dealDuration: 12,
          expandedFrom: [],
          pricingModel: {
            companyId: 1,
            createdAt: '2022-10-20T10:06:48.864Z',
            isEnabled: true,
            modelName: 'Subscription model (tired type)',
            modelType: 'Subscription',
            updatedAt: '2022-10-20T10:06:48.864Z',
            unitMetric: 'user',
            pricingType: 'Tiered',
            tiersEnabled: true,
            unitDuration: 'Per Calendar Month',
            pricingModelId: 3,
          },
          unitDuration: 1,
          upgradedFrom: [],
          defaultFields: {
            termLength: 1,
          },
          downgradedFrom: [],
          perUnitPerYear: 276,
          perUnitUpfront: 'N/A',
          partnerDiscount: 0.1,
          perUnitConsumed: 'N/A',
          quoteProductUuid: '2c234929-8fc7-4db2-92d0-c286e5c8d3d6',
          grossMarginDollar: 38610,
          netPriceToChannel: 552000,
          impliedCustomerPrice: 552000,
          discretionaryDiscount: 0.1,
          grossMarginPercentage: 0.8393478260869566,
          relativeNetPriceDollar: 0,
          listPricePerUnitDuration: 46000,
          relativeNetPricePercentage: 0,
          relativeCustomerPriceDollar: 0,
          totalChannelProgramDiscount: 0.2,
          currentCustomerProductNetPrice: 0,
          currentCustomerProductListPrice: 0,
          relativeCustomerPricePercentage: 0,
          daysFromQuoteExpirationToStartDate: -4,
          currentCustomerProductDefaultNetPrice: 0,
          currentCustomerProductDefaultListPrice: 0,
        },
        invoiceSchedule: {
          prices: {
            '10/20/2023': 276000,
            '10/21/2022': 276000,
          },
          paymentDates: ['10/21/2022', '10/20/2023'],
          defaultFields: {
            currentBillingFrequency: 'Quarterly',
          },
          currentBillingFrequency: 'Quarterly',
          defaultBillingFrequency: 'Quarterly',
        },
        paymentTerm: '10 Net 10 Days',
        isLocked: false,
        isEnabled: true,
        createdAt: '2022-10-21T10:30:53.287Z',
        updatedAt: '2022-10-21T10:30:53.287Z',
        product: {
          productId: 3,
          companyId: 1,
          productHierarchyId: 74,
          ownerUserId: 2,
          pricingModelId: 3,
          skuNumber: 'sku-c',
          productName: 'Product C (sub)',
          term: 1,
          termType: 'years',
          sameUnitPriceForAllTiers: false,
          billingFrequency: 'Annually (Calendar)',
          productAvailability: 'Current Product',
          isExpandable: true,
          isUpgradable: false,
          isDowngradable: false,
          isRenewable: true,
          isEnabled: true,
          createdAt: '2022-10-20T10:07:39.167Z',
          updatedAt: '2022-10-20T10:07:39.167Z',
        },
      },
      {
        companyId: 1,
        quoteProductId: 15,
        productId: 1,
        quoteId: 25,
        endDate: '2023-10-21T00:00:00.000Z',
        startDate: '2022-10-21T00:00:00.000Z',
        quantity: 3000,
        customerProductUuid: null,
        lockedFields: {
          cogs: 0,
          days: 365,
          weeks: 52,
          years: 1,
          months: 12,
          endDate: '2023-10-20T00:00:00.000Z',
          product: {
            term: 1,
            addons: [],
            termType: 'years',
            upgrades: [],
            companyId: 1,
            createdAt: '2022-10-20T09:37:27.377Z',
            isEnabled: true,
            productId: 1,
            skuNumber: 'sku-a',
            updatedAt: '2022-10-20T09:37:27.377Z',
            downgrades: [],
            priceTiers: [
              {
                cogsUnit: 0,
                unitTier: {
                  endRange: 100,
                  companyId: 1,
                  createdAt: '2022-10-20T09:36:39.006Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T09:36:39.006Z',
                  startRange: 1,
                  unitTierId: 1,
                  unitTierName: 'Tier 1',
                  pricingModelId: 1,
                },
                companyId: 1,
                createdAt: '2022-10-20T09:37:27.732Z',
                isEnabled: true,
                priceUnit: 300,
                productId: 1,
                updatedAt: '2022-10-20T09:37:27.732Z',
                unitTierId: 1,
                priceTierId: 1,
              },
              {
                cogsUnit: 0,
                unitTier: {
                  endRange: 200,
                  companyId: 1,
                  createdAt: '2022-10-20T09:36:39.006Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T09:36:39.006Z',
                  startRange: 101,
                  unitTierId: 2,
                  unitTierName: 'Tier 2',
                  pricingModelId: 1,
                },
                companyId: 1,
                createdAt: '2022-10-20T09:37:27.732Z',
                isEnabled: true,
                priceUnit: 250,
                productId: 1,
                updatedAt: '2022-10-20T09:37:27.732Z',
                unitTierId: 2,
                priceTierId: 2,
              },
              {
                cogsUnit: 0,
                unitTier: {
                  endRange: 9007199254740991,
                  companyId: 1,
                  createdAt: '2022-10-20T09:36:39.006Z',
                  isEnabled: true,
                  updatedAt: '2022-10-20T09:36:39.006Z',
                  startRange: 201,
                  unitTierId: 3,
                  unitTierName: 'Tier 3',
                  pricingModelId: 1,
                },
                companyId: 1,
                createdAt: '2022-10-20T09:37:27.732Z',
                isEnabled: true,
                priceUnit: 200,
                productId: 1,
                updatedAt: '2022-10-20T09:37:27.732Z',
                unitTierId: 3,
                priceTierId: 3,
              },
            ],
            isRenewable: true,
            ownerUserId: 2,
            productName: 'Product A (consumption model)',
            isExpandable: true,
            isUpgradable: false,
            pricingModel: {
              companyId: 1,
              createdAt: '2022-10-20T09:36:38.642Z',
              isEnabled: true,
              modelName: 'Consumption model (volume pricing type)',
              modelType: 'Consumption',
              updatedAt: '2022-10-20T09:36:38.642Z',
              unitMetric: 'user',
              pricingType: 'Volume',
              tiersEnabled: true,
              unitDuration: 'Consumed',
              pricingModelId: 1,
            },
            isDowngradable: false,
            pricingModelId: 1,
            billingFrequency: 'Annually (Calendar)',
            productHierarchy: {
              isActive: true,
              parentId: 78,
              companyId: 1,
              createdAt: '2022-10-19T17:22:37.155Z',
              isEnabled: true,
              updatedAt: '2022-10-19T17:22:37.155Z',
              hierarchyId: 79,
              hierarchyName: 'None',
              hierarchyLevelId: 12,
            },
            productHierarchyId: 79,
            productAvailability: 'Current Product',
            sameUnitPriceForAllTiers: true,
          },
          quantity: 3000,
          discounts: {
            channel: [
              {
                channel_program_discount: 0,
              },
              {
                channel_discretionary_discount: 0,
              },
            ],
            customer: [
              {
                customer_program_discount_: 0,
              },
              {
                customer_discretionary_discount: 0,
              },
            ],
          },
          listPrice: 600000,
          startDate: '2022-10-21T00:00:00.000Z',
          priceTiers: [
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 100,
                companyId: 1,
                createdAt: '2022-10-20T09:36:39.006Z',
                isEnabled: true,
                updatedAt: '2022-10-20T09:36:39.006Z',
                startRange: 1,
                unitTierId: 1,
                unitTierName: 'Tier 1',
                pricingModelId: 1,
              },
              companyId: 1,
              createdAt: '2022-10-20T09:37:27.732Z',
              isEnabled: true,
              priceUnit: 300,
              productId: 1,
              updatedAt: '2022-10-20T09:37:27.732Z',
              unitTierId: 1,
              priceTierId: 1,
            },
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 200,
                companyId: 1,
                createdAt: '2022-10-20T09:36:39.006Z',
                isEnabled: true,
                updatedAt: '2022-10-20T09:36:39.006Z',
                startRange: 101,
                unitTierId: 2,
                unitTierName: 'Tier 2',
                pricingModelId: 1,
              },
              companyId: 1,
              createdAt: '2022-10-20T09:37:27.732Z',
              isEnabled: true,
              priceUnit: 250,
              productId: 1,
              updatedAt: '2022-10-20T09:37:27.732Z',
              unitTierId: 2,
              priceTierId: 2,
            },
            {
              cogsUnit: 0,
              unitTier: {
                endRange: 9007199254740991,
                companyId: 1,
                createdAt: '2022-10-20T09:36:39.006Z',
                isEnabled: true,
                updatedAt: '2022-10-20T09:36:39.006Z',
                startRange: 201,
                unitTierId: 3,
                unitTierName: 'Tier 3',
                pricingModelId: 1,
              },
              companyId: 1,
              createdAt: '2022-10-20T09:37:27.732Z',
              isEnabled: true,
              priceUnit: 200,
              productId: 1,
              updatedAt: '2022-10-20T09:37:27.732Z',
              unitTierId: 3,
              priceTierId: 3,
            },
          ],
          termLength: 1,
          productType: 'Net New',
          renewedFrom: [],
          dealDuration: 1,
          expandedFrom: [],
          pricingModel: {
            companyId: 1,
            createdAt: '2022-10-20T09:36:38.642Z',
            isEnabled: true,
            modelName: 'Consumption model (volume pricing type)',
            modelType: 'Consumption',
            updatedAt: '2022-10-20T09:36:38.642Z',
            unitMetric: 'user',
            pricingType: 'Volume',
            tiersEnabled: true,
            unitDuration: 'Consumed',
            pricingModelId: 1,
          },
          unitDuration: 1,
          upgradedFrom: [],
          defaultFields: {
            termLength: 1,
          },
          downgradedFrom: [],
          perUnitPerYear: 'N/A',
          perUnitUpfront: 'N/A',
          partnerDiscount: 0.1,
          perUnitConsumed: 200,
          quoteProductUuid: '39ed3343-2514-41b8-9e08-6eaa09c7fbfa',
          grossMarginDollar: 600000,
          netPriceToChannel: 600000,
          impliedCustomerPrice: 600000,
          discretionaryDiscount: 0.1,
          grossMarginPercentage: 1,
          relativeNetPriceDollar: 0,
          listPricePerUnitDuration: 600000,
          relativeNetPricePercentage: 0,
          relativeCustomerPriceDollar: 0,
          totalChannelProgramDiscount: 0.2,
          currentCustomerProductNetPrice: 0,
          currentCustomerProductListPrice: 0,
          relativeCustomerPricePercentage: 0,
          daysFromQuoteExpirationToStartDate: -4,
          currentCustomerProductDefaultNetPrice: 0,
          currentCustomerProductDefaultListPrice: 0,
        },
        invoiceSchedule: {
          prices: {
            '10/20/2023': 0,
            '10/21/2022': 0,
          },
          paymentDates: ['10/21/2022', '10/20/2023'],
          defaultFields: {
            currentBillingFrequency: 'Quarterly',
          },
          currentBillingFrequency: 'Quarterly',
          defaultBillingFrequency: 'Quarterly',
        },
        paymentTerm: '10 Net 10 Days',
        isLocked: false,
        isEnabled: true,
        createdAt: '2022-10-21T10:30:53.570Z',
        updatedAt: '2022-10-21T10:30:53.570Z',
        product: {
          productId: 1,
          companyId: 1,
          productHierarchyId: 79,
          ownerUserId: 2,
          pricingModelId: 1,
          skuNumber: 'sku-a',
          productName: 'Product A (consumption model)',
          term: 1,
          termType: 'years',
          sameUnitPriceForAllTiers: true,
          billingFrequency: 'Annually (Calendar)',
          productAvailability: 'Current Product',
          isExpandable: true,
          isUpgradable: false,
          isDowngradable: false,
          isRenewable: true,
          isEnabled: true,
          createdAt: '2022-10-20T09:37:27.377Z',
          updatedAt: '2022-10-20T09:37:27.377Z',
        },
      },
    ],
    quoteAttributes: [
      {
        name: 'Net New',
        value: false,
      },
      {
        name: 'Expansion',
        value: false,
      },
      {
        name: 'Renewal',
        value: false,
      },
      {
        name: 'Custom Billing',
        value: false,
      },
      {
        name: 'Custom Discount 2',
        value: false,
      },
    ],
    expiresAt: '2022-09-20T00:00:00.000Z',
    submittedAt: '2022-09-14T09:56:13.739Z',
    pdfFileUrl: null,
    excelFileUrl: null,
    isExternal: false,
    isBlackBox: false,
    isAcceptingCreditCard: false,
    isRequiringSigning: true,
    isLocked: false,
    isDistributorVisible: false,
    isResellerVisible: false,
    isExternalHideInvoice: false,
    isExternalHideUnit: false,
    isExternalHideContact: false,
    isEnabled: true,
    createdAt: '2022-09-14T09:43:57.897Z',
    updatedAt: '2022-09-14T09:56:13.737Z',
    usersQuotes: [
      {
        companyId: 1,
        quoteId: 23,
        userId: 1,
        type: 'Internal',
        isOwner: true,
        isApprover: false,
        approvalStatus: null,
        isSavedAlertUser: false,
        isWorkflowUser: true,
        isEnabled: true,
        createdAt: '2022-09-14T09:43:58.316Z',
        updatedAt: '2022-09-14T09:43:58.316Z',
      },
    ],
    geoHierarchy: {
      companyId: 1,
      hierarchyId: 1,
      hierarchyLevelId: 1,
      parentId: 1,
      hierarchyName: 'North America',
      isEnabled: true,
      isActive: true,
      createdAt: '2022-09-01T17:18:44.350Z',
      updatedAt: '2022-09-01T17:18:44.350Z',
    },
    customer: {
      customerId: 1,
      companyId: 1,
      licensingProgramId: 1,
      organizationId: '49ff4263-93bc-49d7-8296-2d48eb4e1b43',
      salesOrganizationId: 'acf84179-973a-4e0b-9de8-5cbec2592f81',
      customerName: 'JaysonTerry',
      industry: 'Vehicle',
      customerEmail: 'Karlee99@gmail.com',
      logoUrl: 'https://placeimg.com/640/480',
      phone: '+1 929 275-8021',
      addressId: 1,
      isEnabled: true,
      createdAt: '2022-09-01T17:19:06.394Z',
      updatedAt: '2022-09-01T17:19:06.394Z',
      customerAddresses: [
        {
          address: {
            addressId: 1,
            companyId: 1,
            address_1: 'Apt. 353',
            address_2: 'Apt. 176',
            address_3: 'Suite 202',
            city: 'East Phyllis',
            zipCode: '31173',
            region: 'Florida',
            country: 'Cambridgeshire',
            phone: '+1 929 275-3616',
            email: 'Conrad_Lakin55@yahoo.com',
            addressType: 'Billing',
            createdAt: '2022-09-01T17:18:40.237Z',
            updatedAt: '2022-09-01T17:18:40.237Z',
          },
        },
        {
          address: {
            addressId: 1,
            companyId: 1,
            address_1: 'Apt. 354',
            address_2: 'Apt. 177',
            address_3: 'Suite 203',
            city: 'East Phyllis',
            zipCode: '31173',
            region: 'Florida',
            country: 'Cambridgeshire',
            phone: '+1 929 275-3617',
            email: 'Conrad_Lakin56@yahoo.com',
            addressType: 'Shipping',
            isEnabled: true,
            createdAt: '2022-09-01T17:18:40.237Z',
            updatedAt: '2022-09-01T17:18:40.237Z',
          },
        },
      ],
    },
    quotesContacts: [
      {
        companyId: 1,
        quoteId: 68,
        contactId: 75,
        position: 1,
        type: 'Internal',
        createdAt: '2022-09-14T09:43:58.625Z',
        updatedAt: '2022-09-14T09:43:58.625Z',
        isEnabled: true,
        isOwner: true,
        contact: {
          contactId: 75,
          companyId: 1,
          companyName: 'Staging LLC 11',
          jobTitle: 'Internal',
          lastName: 'Admin',
          firstName: 'Mike',
          contactEmail: 'Demo_admin@vendori.com',
          phone: '+1234567890',
          isEnabled: true,
          createdAt: '2022-09-14T09:43:58.294Z',
          updatedAt: '2022-09-14T09:43:58.294Z',
        },
      },
    ],
    daysSinceSubmission: '0 day(s)',
    isApprovalTurn: false,
  },
];
