import * as dayjs from 'dayjs';
import * as _ from 'lodash';
import {
  DealTypeEnum,
  QuoteProduct,
  QuoteProductTotals,
  QuoteProductTotalsTransformed,
} from '../../types';
import { formatCurrency, formatNumber, formatPercentage } from '../formatters';
import {
  _getDiscountKeys,
  _getDiscounts,
} from '../../../salesforce/salesforce.utils/field-mapping.salesforce.util';

/**
 * Transforms single quote product.
 * @private
 */
const transformQuoteProduct = async (
  quoteProduct: any,
  quoteDealType: DealTypeEnum,
  totalProducts: number,
) => {
  const {
    product,
    productType,
    startDate,
    endDate,
    quantity,
    listPrice,
    impliedCustomerPrice,
    netPriceToChannel,
  } = quoteProduct.lockedFields;
  const { bundleId } = quoteProduct;

  // Old logic
  // if (impliedCustomerPrice && listPrice) {
  //   totalCustomerDiscount =
  //     (100 - (impliedCustomerPrice * 100) / listPrice) / 100;
  // }

  // if (netPriceToChannel && impliedCustomerPrice) {
  //   totalChannelDiscount =
  //     (100 - (netPriceToChannel * 100) / impliedCustomerPrice) / 100;
  // }

  const discountKeys = _getDiscountKeys(quoteDealType);
  const discounts = {
    [discountKeys['customPercent']]: formatNumber(0),
    [discountKeys['customAmount']]: formatNumber(0),
    [discountKeys['programAmount']]: formatNumber(0),
    [discountKeys['programPercent']]: formatNumber(0),
  };
  const discountsForProduct = await _getDiscounts(
    quoteDealType,
    _.get(quoteProduct.lockedFields, 'listPrice', 0),
    quoteProduct.lockedFields['discounts'],
  );

  discounts[discountKeys['customPercent']] += Boolean(totalProducts)
    ? +discountsForProduct[discountKeys['customPercent']]
    : 0;
  discounts[discountKeys['customAmount']] += Boolean(totalProducts)
    ? +discountsForProduct[discountKeys['customAmount']]
    : 0;
  discounts[discountKeys['programAmount']] += Boolean(totalProducts)
    ? +discountsForProduct[discountKeys['programAmount']]
    : 0;
  discounts[discountKeys['programPercent']] += Boolean(totalProducts)
    ? +discountsForProduct[discountKeys['programPercent']]
    : 0;

  const totalCustomerDiscountAmt =
    quoteDealType === DealTypeEnum.CHANNEL
      ? formatNumber(0)
      : discounts[discountKeys['customAmount']] +
        discounts[discountKeys['programAmount']];
  const totalCustomerDiscountPercent =
    quoteDealType === DealTypeEnum.CHANNEL
      ? formatNumber(0)
      : formatPercentage(
          discounts[discountKeys['customPercent']] +
            discounts[discountKeys['programPercent']],
        );
  const totalChannelDiscountAmt =
    quoteDealType === DealTypeEnum.DIRECT
      ? formatNumber(0)
      : discounts[discountKeys['customAmount']] +
        discounts[discountKeys['programAmount']];
  const totalChannelDiscountPercent =
    quoteDealType === DealTypeEnum.DIRECT
      ? formatNumber(0)
      : formatPercentage(
          discounts[discountKeys['customPercent']] +
            discounts[discountKeys['programPercent']],
        );
  const netPrice = netPriceToChannel || impliedCustomerPrice;

  return {
    productName: bundleId
      ? `\u200B\t${product.productName}`
      : product.productName,
    transactionType: productType,
    quantity: {
      value: quantity,
      formattedValue: formatNumber(quantity),
    },
    startDate: {
      value: dayjs(startDate).toDate(),
      formattedValue: dayjs(startDate).format('MM/DD/YY'),
    },
    endDate: {
      value: endDate ? dayjs(endDate).format('MM/DD/YY') : '-',
      formattedValue: endDate ? dayjs(endDate).format('MM/DD/YY') : '-',
    },

    listPrice: {
      value: listPrice,
      formattedValue: formatCurrency(listPrice),
    },

    totalCustomerDiscount: {
      value: totalCustomerDiscountAmt,
      formattedValue: totalCustomerDiscountPercent,
    },

    customerPrice: {
      value: impliedCustomerPrice,
      formattedValue: formatCurrency(impliedCustomerPrice),
    },

    totalChannelDiscount: {
      value: totalChannelDiscountAmt,
      formattedValue: totalChannelDiscountPercent,
    },

    netPrice: {
      value: netPrice,
      formattedValue: formatCurrency(netPrice),
    },
    bundleName: quoteProduct.bundle && quoteProduct.bundle.productName,
  };
};

/**
 * Transforms multiple quote products using `transformQuoteProduct` fn.
 */
export const transformQuoteProducts = async (
  quoteProducts: any[],
  dealType: DealTypeEnum,
): Promise<QuoteProduct[]> => {
  const products: QuoteProduct[] = [];
  await Promise.all(
    quoteProducts.map(async (p) => {
      products.push(
        await transformQuoteProduct(p, dealType, quoteProducts.length),
      );
    }),
  );
  return products;
};

/**
 * Builds PDF line for quote bundle.
 * @private
 */
const quoteBundleBuilder = (products: any[]) => {
  const startDate = products.sort((a, b) => a.startDate - b.startDate)[0]
    .startDate;
  const { quantity, customerPrice, netPrice, listPrice } =
    calculateQuoteProductTotals(products);

  const structure = {
    productName: { text: products[0].bundleName || null, bold: true },
    transactionType: '',
    quantity: {
      value: quantity,
      formattedValue: formatNumber(quantity),
    },
    startDate: {
      value: startDate.value,
      formattedValue: startDate.formattedValue,
    },
    endDate: {
      value: '',
      formattedValue: '',
    },
    listPrice: {
      value: listPrice,
      formattedValue: formatCurrency(listPrice),
    },
    totalCustomerDiscount: {
      value: '',
      formattedValue: '',
    },
    customerPrice: {
      value: customerPrice,
      formattedValue: formatCurrency(customerPrice),
    },
    totalChannelDiscount: {
      value: '',
      formattedValue: '',
    },
    netPrice: {
      value: netPrice,
      formattedValue: formatCurrency(netPrice),
    },
  };

  return structure;
};

/**
 * Groups products by `bundleId` in object.
 * @private
 */
const groupProductsByBundleId = async (data: any, dealType: DealTypeEnum) => {
  const groupedProducts = {};
  for (const product of data) {
    const { bundleId } = product;

    if (!groupedProducts[bundleId]) {
      groupedProducts[bundleId] = [];
    }

    const transformedProduct = await transformQuoteProduct(
      product,
      dealType,
      data.length,
    );

    groupedProducts[bundleId].push(transformedProduct);
  }

  return groupedProducts;
};

/**
 * Groups products by bundle ids.
 */
export const gatherProductsWithBundles = async (
  quoteProducts: any,
  dealType: DealTypeEnum,
) => {
  const productsGroupByBundle = await groupProductsByBundleId(
    quoteProducts,
    dealType,
  );
  const bundleIds = Object.keys(productsGroupByBundle);

  return bundleIds.reduceRight((acc, bundleId) => {
    if (bundleId === 'null') {
      acc.push(...productsGroupByBundle[bundleId]);

      return acc;
    }

    const bundleById = quoteBundleBuilder(productsGroupByBundle[bundleId]);

    acc.push(bundleById);
    acc.push(...productsGroupByBundle[bundleId]);

    return acc;
  }, []);
};

export function calculateQuoteProductTotals(
  transformedQuoteProducts: QuoteProduct[],
): QuoteProductTotals {
  return transformedQuoteProducts.reduce(
    (acc, curr) => {
      acc.quantity += curr.quantity.value;
      acc.listPrice += curr.listPrice.value;
      acc.customerPrice += curr.customerPrice.value;
      acc.netPrice += curr.netPrice.value;

      return acc;
    },
    { quantity: 0, listPrice: 0, customerPrice: 0, netPrice: 0 },
  );
}

export function transformQuoteProductTotals(
  quoteProductTotals: any,
): QuoteProductTotalsTransformed {
  return {
    quantity: formatNumber(quoteProductTotals.quantity),
    listPrice: formatCurrency(quoteProductTotals.listPrice),
    customerPrice: formatCurrency(quoteProductTotals.customerPrice),
    netPrice: formatCurrency(quoteProductTotals.netPrice),
  };
}
