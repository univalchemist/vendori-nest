import * as _ from 'lodash';
import * as moment from 'moment-timezone';

import {
  TreeRepository,
  getTreeRepository,
  Repository,
  getRepository,
} from 'typeorm';

import { OemCustomerAddresses } from '../../../oem/intermediaries/_oem-customer-addresses/oem-customer-addresses.entity';
import { OemQuotesProducts } from '../../../oem/intermediaries/_oem-quotes-products/oem-quotes-products.entity';
import { OemQuotesUsers } from '../../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.entity';

import { AddressTypeEnum } from '../../../oem/main/oem-addresses/oem-address.enums/address-type.enum';
import { EligibleForEnum } from '../../../oem/main/oem-products/oem-product.enums/eligible-for.enum';
import { UnitMetricEnum } from '../../../oem/main/oem-pricing-models/oem-pricing-model.enums/unit-metric.enum';
import { DealTypeEnum } from '../../../oem/main/oem-quotes/oem-quote.enums/deal-type.enum';
import { DiscountTypeEnum } from '../../../oem/main/oem-discounts/oem-discount.enums/discount-type.enum';
import { ProductAvailabilityEnum } from '../../../oem/main/oem-products/oem-product.enums/product-availability.enum';

import { OemQuoteEntity } from '../../../oem/main/oem-quotes/oem-quote.entity';
import { OemProductEntity } from '../../../oem/main/oem-products/oem-product.entity';
import { OemHierarchyEntity } from '../../../oem/main/oem-hierarchies/oem-hierarchy.entity';
import { OemDiscountEntity } from '../../../oem/main/oem-discounts/oem-discount.entity';
import { QuoteStatusEnum } from '../../../oem/main/oem-quotes/oem-quote.enums/quote-status.enum';

function formatNumber(n: string | number): string {
  // ChatGPT what up?
  // n = n.toString().trim().replace(/[^0-9.]/g, '');
  // n = (n.includes('.') ? n : n + '.').padEnd(n.indexOf('.') + 3, '0');
  // if (n.match(/\.\d{3}$/) === null) n = `${n}0`;

  if (!n) n = 0;

  n = Number(n);

  return n.toFixed(3);
}

function formatPercent(n: string | number): string {
  n = Number(n);

  if (!n || n < 0) n = 0;
  if (n > 1) n = 1;

  return (n * 100).toFixed(3);
}

function formatDate(datetime: Date): string {
  if (!datetime) return '';

  return datetime.toISOString().replace(/T.+/, '');
}

export function _getDiscountKeys(type: DealTypeEnum) {
  const prefix = type === DealTypeEnum.CHANNEL ? 'Channel' : 'Customer';

  return {
    customPercent: `${prefix}_Discretionary_Discount_Percent__c`,
    customAmount: `${prefix}_Discretionary_Discount_Amt__c`,
    programAmount: `${prefix}_Program_Discount_Amt__c`,
    programPercent: `${prefix}_Program_Discount_Percent__c`,
  };
}

export async function _getDiscounts(
  type: DealTypeEnum,
  listPrice: number,
  discountIdsAndValues: any[],
): Promise<any> {
  // Returns OemDiscountEntity[] + value
  const discountRepository: Repository<OemDiscountEntity> =
    getRepository(OemDiscountEntity);
  const discountType = type === DealTypeEnum.CHANNEL ? 'channel' : 'customer';
  const discountKeys = _getDiscountKeys(type);

  if (
    !discountIdsAndValues[discountType] ||
    !discountIdsAndValues[discountType][0]
  ) {
    return {
      [`${discountKeys['customAmount']}`]: 0,
      [`${discountKeys['customPercent']}`]: 0,
      [`${discountKeys['programAmount']}`]: 0,
      [`${discountKeys['programPercent']}`]: 0,
    };
  }

  const discountIds = Object.values(discountIdsAndValues[discountType]).flatMap(
    (d: any[]) => d['id'],
  );
  const discounts = await discountRepository.findByIds(discountIds);

  if (discounts.length) {
    discountIdsAndValues[discountType] = discountIdsAndValues[discountType].map(
      (d: any[]) => {
        const discount = discounts.filter((v) => v.discountId !== d['id'])[0];

        if (discount) return { ...d, ...discount };
        else return discount;
      },
    );

    const discretionaryDiscounts = discountIdsAndValues[discountType]
      .filter((d) => d?.discountType === DiscountTypeEnum.DISCRETIONARY)
      .flatMap((d) => d?.value)
      .reduce((a, v) => a + v, 0);

    const programDiscounts = discountIdsAndValues[discountType]
      .filter((d) => d?.discountType === DiscountTypeEnum.PROGRAM)
      .flatMap((d) => d?.value)
      .reduce((a, v) => a + v, 0);

    const result = {
      [`${discountKeys['customAmount']}`]: listPrice * discretionaryDiscounts,
      [`${discountKeys['customPercent']}`]: discretionaryDiscounts * 100,
      [`${discountKeys['programAmount']}`]: listPrice * programDiscounts,
      [`${discountKeys['programPercent']}`]: programDiscounts * 100,
    };

    return result;
  } else {
    return {};
  }
}

async function _getHierarchies(
  hierarchy: OemHierarchyEntity | Partial<OemHierarchyEntity>,
  product?: OemProductEntity,
): Promise<OemHierarchyEntity[]> {
  const hierarchyRepository: TreeRepository<OemHierarchyEntity> =
    getTreeRepository(OemHierarchyEntity);

  // console.log('_getHierarchies > hierarchy', hierarchy);

  if (!hierarchy && !product?.productHierarchyId)
    throw new Error('_getHierarchies > Hierarchy is not defined.');

  try {
    let currentNode: OemHierarchyEntity = (hierarchy ||
      product.productHierarchy) as OemHierarchyEntity;

    if (!currentNode.parent || !currentNode.hierarchyLevel)
      currentNode = await hierarchyRepository.findOne(
        hierarchy.hierarchyId || product?.productHierarchyId,
        {
          relations: ['parent', 'parent.hierarchyLevel', 'hierarchyLevel'],
        },
      );

    // console.log('_getHierarchies > currentNode', currentNode);

    const parents: OemHierarchyEntity[] | Partial<OemHierarchyEntity>[] = [
      hierarchy,
    ];

    // Loop through the parent nodes until the root node (level 1) is reached
    while (currentNode && currentNode.hierarchyLevel?.level > 1) {
      // console.log(
      //   '_getHierarchies > currentNode > level',
      //   currentNode.hierarchyLevel?.level,
      //   currentNode.hierarchyLevel?.level > 1,
      // );

      const parentNode = await hierarchyRepository.findOne(
        currentNode.parentId,
        {
          relations: ['parent', 'parent.hierarchyLevel', 'hierarchyLevel'],
        },
      );

      // console.log('_getHierarchies > parentNode', parentNode);

      if (parentNode) {
        parents.unshift(parentNode);
        currentNode = parentNode;
      } else {
        currentNode = undefined;
      }
    }

    return parents as OemHierarchyEntity[];
  } catch (error) {
    console.error('_getHierarchies', error);
    return [];
  }
}

function _formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function _getUnitMetric(metric: string): string {
  const unitMetric = `Per ${metric}`;
  const unitMetricComparison =
    unitMetric === UnitMetricEnum.PER_CLICK ||
    unitMetric === UnitMetricEnum.PER_GB ||
    unitMetric === UnitMetricEnum.PER_MB ||
    unitMetric === UnitMetricEnum.PER_UNIT ||
    unitMetric === UnitMetricEnum.PER_USER;

  return (unitMetricComparison ? unitMetric : 'Per Unit')
    .toUpperCase()
    .replace(' ', '_');
}

// TODO: Cleanup the format & Use a configuration mapper between Salesforce and Vendori properties @saleforce_sync
export function opportunityFieldMapping(quote: OemQuoteEntity) {
  const billingAddress = quote.customer?.customerAddresses.find(
    (customerAddress: OemCustomerAddresses) =>
      customerAddress.address.addressType === AddressTypeEnum.BILLING,
  );

  const shippingAddress = quote.customer?.customerAddresses.find(
    (customerAddress: OemCustomerAddresses) =>
      customerAddress.address.addressType === AddressTypeEnum.SHIPPING,
  );

  const discountKeys = _getDiscountKeys(quote.dealType);
  const discounts = {
    [discountKeys['customPercent']]: 0,
    [discountKeys['customAmount']]: 0,
    [discountKeys['programAmount']]: 0,
    [discountKeys['programPercent']]: 0,
  };
  let Gross_Margin_Percent__c = 0;
  let Gross_Margin_Amt__c = 0;
  let ACV__c = formatNumber(0);
  let MRR__c = formatNumber(0);
  let ARR__c = formatNumber(0);
  let quoteTerm = 'days';

  const totalProducts = quote.quotesProducts.length;

  quote.quotesProducts.forEach(async (p: OemQuotesProducts) => {
    Gross_Margin_Percent__c += _.get(
      p.lockedFields,
      'grossMarginPercentage',
      0,
    );
    Gross_Margin_Amt__c += _.get(p.lockedFields, 'grossMarginDollar', 0);

    ACV__c += _.get(p.lockedFields, 'anual_contract_value', 0);
    MRR__c += _.get(p.lockedFields, 'monthly_recurring_revenue', 0);
    ARR__c += _.get(p.lockedFields, 'annual_recurring_revenue', 0);

    const discountsForProduct = await _getDiscounts(
      quote.dealType,
      _.get(p.lockedFields, 'listPrice', 0),
      p.lockedFields['discounts'],
    );

    discounts[discountKeys['customPercent']] += Boolean(totalProducts)
      ? discountsForProduct[discountKeys['customPercent']]
      : 0;
    discounts[discountKeys['customAmount']] += Boolean(totalProducts)
      ? discountsForProduct[discountKeys['customAmount']]
      : 0;
    discounts[discountKeys['programAmount']] += Boolean(totalProducts)
      ? discountsForProduct[discountKeys['programAmount']]
      : 0;
    discounts[discountKeys['programPercent']] += Boolean(totalProducts)
      ? discountsForProduct[discountKeys['programPercent']]
      : 0;

    switch (p.invoiceSchedule['currentBillingFrequency']) {
      case 'Daily':
        if (
          quoteTerm !== 'years' &&
          quoteTerm !== 'months' &&
          quoteTerm !== 'weeks'
        )
          quoteTerm = 'days';
        break;
      case 'Weekly':
        if (quoteTerm !== 'years' && quoteTerm !== 'months')
          quoteTerm = 'weeks';
        break;
      case 'Monthly':
        if (quoteTerm !== 'years') quoteTerm = 'months';
        break;
      case 'Yearly':
        quoteTerm = 'years';
        break;
      default:
        break;
    }
  });

  const dates = {
    Contract_Start_Date__c: formatDate(quote.createdAt),
    Contract_End_Date__c: formatDate(quote.expiresAt),
    CloseDate: quote.expiresAt,
    ...(quote.signedDate && {
      Date_of_Signature__c: formatDate(quote.signedDate),
    }),
    ...((quote.approvedDate ||
      quote.quoteStatus === QuoteStatusEnum.APPROVED) && {
      Internal_Approval_Completed_On__c: formatDate(
        quote.approvedDate || quote.updatedAt,
      ),
    }),
  };

  const costs = {
    Gross_Margin_Percent__c: formatPercent(
      Boolean(totalProducts) ? Gross_Margin_Percent__c / totalProducts : 0,
    ),
    Gross_Margin_Amt__c: formatNumber(Gross_Margin_Amt__c),
    ACV__c,
    MRR__c,
    ARR__c,

    ...discounts,
    Total_Channel_Discount_Amt__c:
      quote.dealType === DealTypeEnum.DIRECT
        ? formatNumber(0)
        : discounts[discountKeys['customAmount']] +
          discounts[discountKeys['programAmount']],
    Total_Channel_Discount_Percent__c:
      quote.dealType === DealTypeEnum.DIRECT
        ? formatNumber(0)
        : formatPercent(
            discounts[discountKeys['customPercent']] +
              discounts[discountKeys['programPercent']],
          ),
    Total_Customer_Discount_Amt__c:
      quote.dealType === DealTypeEnum.CHANNEL
        ? formatNumber(0)
        : discounts[discountKeys['customAmount']] +
          discounts[discountKeys['programAmount']],
    Total_Customer_Discount_Percent__c:
      quote.dealType === DealTypeEnum.CHANNEL
        ? formatNumber(0)
        : formatPercent(
            discounts[discountKeys['customPercent']] +
              discounts[discountKeys['programPercent']],
          ),
    Total_Discount__c:
      discounts[discountKeys['customAmount']] +
      discounts[discountKeys['programAmount']],
  };

  const result = {
    Id: quote.opportunityId,
    Vendori_Opportunity_Id__c: quote.quoteId,
    Vendori_Quote_Field__c: quote.quoteId,
    // Name: quote.quoteName,
    // Pricebook2Id: '01sDn000008NDrwIAG',
    Deal_Type__c: quote.dealType,
    Quote_Terms__c: quoteTerm,
    // Primary_Quote_Status__c: quote.quoteStatus,
    // Delivery_Status__c: quote.deliveryStatus, // Value should be matched

    ...(quote.ownerUser?.sfUserId && { OwnerId: quote.ownerUser?.sfUserId }),
    Primary_Vendori_Quote__c: quote.quoteId,
    ...(quote.sfContractId && { ContractId: quote.sfContractId }),

    Vendori_Address_IDs__c: `${shippingAddress.addressId},${billingAddress.addressId}`,
    // ...(billingAddress && {
    //   Billing_Address__Street__s: billingAddress.address?.address_1,
    //   Billing_Address__City__s: billingAddress.address.city,
    //   Billing_Address__PostalCode__s: billingAddress.address.zipCode,
    //   // Billing_Address__StateCode__s: billingAddress.address.stateCode, // stateCode should be created in address entity
    //   // Billing_Address__CountryCode__s: billingAddress.address.country, // It should be country code instead of country i.e. AF for Afghanistan. countryCode should be created, too
    // }),
    // ...(shippingAddress && {
    //   Shipping_Address__Street__s: shippingAddress.address?.address_1,
    //   Shipping_Address__City__s: shippingAddress.address.city,
    //   Shipping_Address__PostalCode__s: shippingAddress.address.zipCode,
    //   // Shipping_Address__StateCode__s: shippingAddress.address.stateCode, // stateCode should be created in address entity
    //   // Shipping_Address__CountryCode__s: shippingAddress.address.country, // It should be country code instead of country i.e. AF for Afghanistan. countryCode should be created, too
    // }),

    ...dates,
    ...costs,
    // ...(quote.isPrimary && dates),
  };

  console.info('opportunityFieldMapping', result);

  return result;
}
export function quoteFieldMapping(quotes: OemQuoteEntity[]) {
  const quoteReduceFunction = async (acc: any[], quote: OemQuoteEntity) => {
    if (!quote.opportunityId || !quote.ownerUser.sfUserId) {
      console.error(
        'quoteFieldMapping',
        `Please provide a user with a valid OppId and sfUserId for user #${quote.ownerUser?.userId} in quote #${quote.quoteId}`,
      );
      return acc; // OpportunityID is mandatory in salesforce
    }
    // else {
    //   console.info('quoteFieldMapping', `Syncing quote #${quote.quoteId}`);
    // }

    const discountKeys = _getDiscountKeys(quote.dealType);
    let discounts = 0;
    for (const qp of quote.quotesProducts) {
      const discountConfig = await _getDiscounts(
        quote.dealType,
        _.get(qp.lockedFields, 'listPrice', 0),
        qp.lockedFields['discounts'],
      );

      discounts +=
        discountConfig[`${discountKeys['customAmount']}`] +
        discountConfig[`${discountKeys['programAmount']}`];
    }

    // console.log('Discount', discounts);

    if (quote.quotesProducts.length > 0)
      acc.push({
        Name: quote.quoteName,
        Primary__c: quote.isPrimary,
        Status: quote.quoteStatus,
        ...(quote.isPrimary && {
          Primary_Quote_Status__c: quote.quoteStatus,
        }),
        Vendori_Quote_ID__c: `${quote.quoteId}`,
        Amount__c: formatNumber(quote.netAmount),
        Discount__c: formatNumber(discounts), // Get this from the products
        OwnerId: quote.ownerUser.sfUserId,
        OpportunityId: quote.opportunityId,
        Vendori_Quote_Users__c: quote.ownerUser.userId,
      });

    console.info('quoteFieldMapping', acc);

    return acc;
  };
  const upsertBody = quotes.reduce(quoteReduceFunction as any, []);

  return upsertBody;
}

export async function quoteProductFieldMapping(quotes: OemQuoteEntity[]) {
  const quoteProductsToUpdate = [];
  const quoteProductsToCreate = [];

  console.info('quoteProductFieldMapping', `Syncing ${quotes.length} quote(s)`);

  for (const q of quotes) {
    // OemQuoteEntity & OemQuotesProducts
    for (const p of q.quotesProducts) {
      if (!q.opportunityId || !p.product?.sfProductId || !p?.isEnabled)
        continue;

      const hierarchies = await _getHierarchies(
        p.product.productHierarchy,
        p.product,
      );

      const discounts = await _getDiscounts(
        q.dealType,
        _.get(p.lockedFields, 'listPrice', 0),
        p.lockedFields['discounts'],
      );
      const discountKeys = _getDiscountKeys(q.dealType);

      // console.log('discounts', discounts);

      const baseBody = {
        Product2Id: p.product.sfProductId,
        OpportunityId: q.opportunityId,

        Vendori_Quote_Product_ID__c: p.quoteProductId,
        Vendori_Quote__c: q.sfQuoteId,

        ...(p.product.pricingModel?.modelType && {
          PricingModelType__c: p.product.pricingModel?.modelType,
        }),
        ...(p.product.pricingModel?.pricingType && {
          Tiered_Pricing_Method__c: p.product.pricingModel?.pricingType,
        }),

        Quantity: p.quantity,
        ...(p.startDate && { Start_Date__c: _formatDate(p.startDate) }),
        ...(p.endDate && { End_Date__c: _formatDate(p.endDate) }),
        ...(p.product.billingFrequency && {
          Billing_Frequency__c: p.product.billingFrequency,
        }),

        Total_Price__c: formatNumber(
          _.get(p.lockedFields, 'netPriceToChannel', 0),
        ), // hardcode for now
        Gross_Margin_Percent__c: formatPercent(
          _.get(p.lockedFields, 'grossMarginPercentage', 0),
        ),
        Gross_Margin_Amt__c: formatNumber(
          _.get(p.lockedFields, 'grossMarginDollar', 0),
        ),
        Cost_of_Goods_Sold__c: formatNumber(
          _.get(p.lockedFields, 'cogs', 0) ||
            _.get(p.lockedFields, 'cogsDollar', 0),
        ),
        Default_Term__c: formatNumber(_.get(p.lockedFields, 'product.term', 0)),

        Unit_Cost__c: formatNumber(_.get(p.lockedFields, 'listPrice', 0)),
        Unit_Duration__c: _.get(
          p.lockedFields,
          'pricingModel.unitDuration',
          '',
        ),
        Unit_Metric__c: _getUnitMetric(p.product.pricingModel.unitMetric),

        ACV__c: formatNumber(_.get(p.lockedFields, 'anual_contract_value', 0)),
        MRR__c: formatNumber(
          _.get(p.lockedFields, 'monthly_recurring_revenue', 0),
        ),
        ARR__c: formatNumber(
          _.get(p.lockedFields, 'annual_recurring_revenue', 0),
        ),

        Package__c: Boolean(p.bundleId),

        Product_Family__c:
          hierarchies[0]?.hierarchyName ||
          p.product?.productHierarchy?.hierarchyName ||
          '',
        ...((hierarchies[0] && {
          Product_Family__c: hierarchies[0].hierarchyName,
        }) || { Product_Family__c: p.product.productHierarchy?.hierarchyName }),
        ...(hierarchies[1] && {
          Product_Type__c: hierarchies[1].hierarchyName,
        }),
        ...(hierarchies[2] && {
          Product_Class__c: hierarchies[2].hierarchyName,
        }),
        ...(hierarchies[3] && {
          Product_Level_4__c: hierarchies[3].hierarchyName,
        }),
        ...(hierarchies[4] && {
          Product_Level_5__c: hierarchies[4].hierarchyName,
        }),
        ...(hierarchies[5] && {
          Product_Level_6__c: hierarchies[5].hierarchyName,
        }),
        ...(hierarchies[6] && {
          Product_Level_7__c: hierarchies[6].hierarchyName,
        }),
        ...(hierarchies[7] && {
          Product_Level_8__c: hierarchies[7].hierarchyName,
        }),

        UnitPrice: formatNumber(
          _.get(p.lockedFields, 'listPricePerUnitDuration', 0),
        ),
        Discount: formatPercent(
          1 -
            _.get(p.lockedFields, 'netPriceToChannel', 0) /
              _.get(p.lockedFields, 'listPrice', 0),
        ), // Get this from the products

        ...discounts,
      };

      console.info(`quoteProductFieldMapping > #${p.productId}`, baseBody);

      if (p.sfOpportunityProductId)
        quoteProductsToUpdate.push({
          ...baseBody,
          Id: p.sfOpportunityProductId,
        });
      else quoteProductsToCreate.push(baseBody);
    }
  }

  return [quoteProductsToCreate, quoteProductsToUpdate];
}

export function assetFieldMapping(
  quote: OemQuoteEntity,
  quoteProduct: OemQuotesProducts,
  customerProductId: number,
  bundle?: boolean,
  parentId?: string,
) {
  return {
    ...(!bundle && { Vendori_Asset_Id__c: customerProductId }),
    Name: bundle
      ? quoteProduct.bundle.bundleName
      : quoteProduct.product.productName,
    AccountId: quote.customer.salesOrganizationId,
    Product2Id: bundle
      ? quoteProduct.bundle.sfProductId
      : quoteProduct.product.sfProductId,
    Quantity: quoteProduct.quantity,
    OriginalQuantity__c: quoteProduct.quantity,
    Partofbundle__c: Boolean(quoteProduct.bundleId),
    Active_Product__c: true,
    ...(!bundle &&
      quoteProduct.product.productDescription && {
        Description: quoteProduct.product.productDescription,
      }),
    ...(quoteProduct.endDate && {
      End_Date__c: moment(quoteProduct.endDate).format('YYYY-MM-DD'),
    }),
    ...(quoteProduct.startDate && {
      Start_Date__c: moment(quoteProduct.startDate).format('YYYY-MM-DD'),
    }),
    List_Price__c: _.get(quoteProduct.lockedFields, 'listPrice', 0),
    ...(quote.opportunityId && {
      Original_Opportunity__c: quote.opportunityId,
    }),
    ...(quoteProduct.sfOpportunityProductId && {
      Original_Opporutnity_Product__c: quoteProduct.sfOpportunityProductId,
    }),
    Bundle_Header__c: Boolean(quoteProduct.bundleId),
    ...(parentId && { parentId: parentId }),
    ...(parentId && { Parent_Product__c: quoteProduct.bundle.sfProductId }),
    // ...(quoteProduct.product.pricingModel.pricingType && {PricingType__c: quoteProduct.product.pricingModel.pricingType}), // Not match
    // ...(quoteProduct.product.pricingModel.modelType && {PricingModelType__c: quoteProduct.product.pricingModel.modelType}), // Not match
    UnitCost__c: formatNumber(
      _.get(quoteProduct.lockedFields, 'perUnitPerYear', 0),
    ),
    // Unit_Duration__c: _.get(quoteProduct.lockedFields, 'pricingModel.unitDuration', ''), // Value should be matched to picklist of salesforce
    // Unit_Metric__c: _.get(quoteProduct.lockedFields, 'pricingModel.unitMetric', ''), // Value should be matched to picklist of salesforce
    ...(quoteProduct.product.billingFrequency && {
      BillingFrequencyNotes__c: quoteProduct.product.billingFrequency,
    }),
    ...(quote.signedDate && {
      PurchaseDate: moment(quote.signedDate).format('YYYY-MM-DD'),
    }),
    ...(quoteProduct.endDate && {
      UsageEndDate: moment(quoteProduct.endDate).format('YYYY-MM-DD'),
    }),
    ...(quoteProduct.startDate && {
      StartDateUTC__c: moment(quoteProduct.startDate).utc().toISOString(),
    }),
  };
}

export function quoteContactFieldMapping(quoteUsers: OemQuotesUsers[]) {
  const insert = [];
  const destroy = [];

  for (const quoteUser of quoteUsers) {
    if (
      !quoteUser.user ||
      !quoteUser.quote.opportunityId ||
      !quoteUser.user.sfContactId
    )
      continue;

    // console.log(
    //   'quoteContactFieldMapping > quoteUser',
    //   quoteUser.isEnabled,
    //   quoteUser.sfOpportunityContactRoleId,
    // );

    if (quoteUser.isEnabled && !quoteUser.sfOpportunityContactRoleId)
      insert.push({
        OpportunityId: quoteUser.quote.opportunityId,
        ContactId: quoteUser.user.sfContactId,
        Role: 'End Customer',
        Vendori_Contact_Role_ID__c: `${quoteUser.quoteId}-${quoteUser.userId}`,
        Vendori_Quote_ID__c: quoteUser.quoteId,
      });
    else if (!quoteUser.isEnabled && quoteUser.sfOpportunityContactRoleId)
      destroy.push(quoteUser.sfOpportunityContactRoleId);
  }

  // console.log('quoteContactFieldMapping', insert, destroy, quoteUsers.length);

  return { insert, destroy };
}

/* Product filed mapping */
export async function productFieldMapping(
  p: OemProductEntity,
  hierarchy: OemHierarchyEntity,
) {
  const hierarchies = await _getHierarchies(hierarchy, p);

  const result = {
    // ExternalId: p.productId,
    // ExternalDataSourceId: p.productId,
    Vendori_Product__c: p.productId,
    Name: p.productName,
    Description: p.productDescription ?? '',

    ProductCode: p.productCode ?? p.skuNumber ?? '',
    Quantity__c: 1, // hardcoded for now
    ...(p.billingFrequency && { Billing_Frequency__c: p.billingFrequency }),
    ...(p.pricingModel.modelType && {
      Pricing_Model__c: p.pricingModel.modelType,
    }),
    ...(p.pricingModel.unitMetric && {
      Unit_Metric__c: _getUnitMetric(p.pricingModel.unitMetric),
    }),
    IsActive:
      p.productAvailability.includes(ProductAvailabilityEnum.HIDDEN) ||
      p.productAvailability.includes(ProductAvailabilityEnum.RETIRED_PRODUCT) ||
      p.isEnabled,
    DisplayUrl: 'https://staging.vendori.com/admin/product-price-list',

    Product_Family__c:
      hierarchies[0]?.hierarchyName || hierarchy?.hierarchyName || '',
    ...((hierarchies[0] && {
      Product_Family__c: hierarchies[0].hierarchyName,
    }) || { Product_Family__c: p.productHierarchy?.hierarchyName }),
    ...(hierarchies[1] && {
      Product_Type__c: hierarchies[1].hierarchyName,
    }),
    ...(hierarchies[2] && {
      Product_Class__c: hierarchies[2].hierarchyName,
    }),
    ...(hierarchies[3] && {
      Product_Level_4__c: hierarchies[3].hierarchyName,
    }),
    ...(hierarchies[4] && {
      Product_Level_5__c: hierarchies[4].hierarchyName,
    }),
    ...(hierarchies[5] && {
      Product_Level_6__c: hierarchies[5].hierarchyName,
    }),
    ...(hierarchies[6] && {
      Product_Level_7__c: hierarchies[6].hierarchyName,
    }),
    ...(hierarchies[7] && {
      Product_Level_8__c: hierarchies[7].hierarchyName,
    }),

    StockKeepingUnit: p.skuNumber ?? '',
    ...(p.pricingModel.unitDuration && {
      QuantityUnitOfMeasure: p.pricingModel.unitDuration,
    }), // not match picklist value

    Default_Term__c: p.term || 1,
    Default_Term_Type__c: p.termType || 'years',

    Product_Availability__c:
      p.productAvailability[0] || ProductAvailabilityEnum.CURRENT_PRODUCT,
    Expansion_Product__c: p.eligibleFor.includes(EligibleForEnum.EXPANSION)
      ? 1
      : 0,
    Extension_Product__c: p.eligibleFor.includes(EligibleForEnum.EXTENSION)
      ? 1
      : 0,
    Upgrade_Product__c: p.eligibleFor.includes(EligibleForEnum.UPGRADEABLE)
      ? 1
      : 0,
    Downgrade_Product__c: p.eligibleFor.includes(EligibleForEnum.DOWNGRADEBLE)
      ? 1
      : 0,
  };

  console.info(`productFieldMapping > #${p.productId}`, result);

  return result;
}

export function priceBookEntryFieldMapping(
  sfProductId: string,
  sfPriceBookId: string,
  unitPrice = 0,
) {
  return {
    Product2Id: sfProductId,
    Pricebook2Id: sfPriceBookId,
    UnitPrice: formatNumber(unitPrice),
    IsActive: true,
  };
}

export function customerProductFieldMapping(asset: any, companyId: number) {
  const {
    Product2,
    Parent,
    Account,
    Quantity,
    End_Date__c,
    List_Price__c,
    Price,
  } = asset;
  if (Product2.Vendori_Product__c && Account.Vendori_Customer_Id__c) {
    const customerProduct = {
      productId: parseInt(Product2.Vendori_Product__c),
      ...(Parent && { bundleId: parseInt(Parent.Vendori_Asset_Id__c) }),
      customerId: parseInt(Account.Vendori_Customer_Id__c),
      companyId,
      quantity: Quantity,
      endDate: End_Date__c,
      customerPrice: List_Price__c ? parseInt(List_Price__c) : 0,
      netPrice: Price ? parseInt(Price) : 0,
    };
    return customerProduct;
  }
}
