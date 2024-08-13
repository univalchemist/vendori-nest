import { QuoteProduct, CompanyColorsType, DealTypeEnum } from '../../types';

export function declareQuoteProducts(
  dealType: DealTypeEnum,
  quoteProducts: any[],
  quoteProductTotals: any,
  colors: CompanyColorsType,
) {
  const result = {
    layout: {
      hLineWidth: (rowIndex: number, node: any) => {
        if (
          rowIndex === node.table.body.length - 3 ||
          rowIndex === node.table.body.length - 2
        ) {
          return 1;
        }

        return 0;
      },
      hLineColor: (rowIndex: number, node: any) => {
        if (rowIndex === node.table.body.length - 3) {
          return colors.secondary;
        }

        if (rowIndex === node.table.body.length - 2) {
          return '#DFDFDF';
        }

        return '#fff';
      },
      vLineWidth: () => 0.5,
      vLineColor: () => colors.primary,
      fillColor: (rowIndex: number, node: any) => {
        if (
          rowIndex === node.table.body.length - 3 ||
          rowIndex === node.table.body.length - 2 ||
          rowIndex === node.table.body.length - 1
        ) {
          return null;
        }

        return rowIndex % 2 === 0 ? colors.secondary : null;
      },
      fillOpacity: 0.7,
      paddingLeft: () => 8,
      paddingBottom: (rowIndex: number, node: any) => {
        if (
          rowIndex === node.table.body.length - 2 ||
          rowIndex === node.table.body.length - 1
        ) {
          return 2;
        }

        return 5;
      },
      defaultBorder: false,
    },
    table: {
      // headers are automatically repeated if the table spans over multiple pages
      // you can declare how many rows should be treated as headers
      headerRows: 1,
      widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
      body: [
        [
          {
            text: 'Product Name',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Transaction Type',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Term',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Quantity',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'List Price',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Customer Discount',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Customer Price',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
          {
            text: 'Net Price',
            style: 'quoteTableHeader',
            border: [false, false, false, false],
          },
        ],
      ],
    },
    style: 'quoteTable',
  };

  if (dealType === DealTypeEnum.CHANNEL) {
    result.table.widths.push('*');

    result.table.body[0].push({
      text: 'Channel Discount',
      style: 'quoteTableHeader',
      border: [false, false, false, false],
    });
  }

  quoteProducts.forEach((quoteProduct) => {
    result.table.body.push(getQuoteProduct(dealType, quoteProduct) as any);
  });

  result.table.body.push(...(getTotals(dealType, quoteProductTotals) as any));

  return result;
}

function getTotals(dealType: DealTypeEnum, quoteProductTotals: any) {
  const total = [
    {
      text: 'Total',
      bold: true,
      border: [false, true, false, false],
      fontSize: 6,
      margin: [0, 5, 0, 5],
    },
    { text: '', border: [false, true, false, false], margin: [0, 5, 0, 5] },
    { text: '', border: [false, true, false, false], margin: [0, 5, 0, 5] },
    {
      text: quoteProductTotals.quantity,
      bold: true,
      fontSize: 6,
      border: [false, true, false, false],
      margin: [0, 5, 0, 5],
    },
    { text: '', border: [false, true, false, false], margin: [0, 5, 0, 5] },
    { text: '', border: [false, true, false, false], margin: [0, 5, 0, 5] },
    {
      text: quoteProductTotals.customerPrice,
      bold: true,
      fontSize: 6,
      border: [false, true, false, false],
      margin: [0, 5, 0, 5],
    },
    {
      text: quoteProductTotals.netPrice,
      bold: true,
      border: [false, true, false, false],
      margin: [0, 5, 0, 5],
    } as any,
  ];
  if (dealType === DealTypeEnum.CHANNEL) {
    total.push({
      text: '',
      border: [false, true, false, false],
      margin: [0, 5, 0, 5],
    });
  }

  const tax = [
    '',
    '',
    '',
    '',
    '',
    { text: 'Tax', fontSize: 6 },
    '',
    { text: '$0', fontSize: 6 },
  ];
  if (dealType === DealTypeEnum.CHANNEL) {
    tax.unshift('');
  }

  const grandTotal = [
    '',
    '',
    '',
    '',
    '',
    { text: 'Grand Total', bold: true, fontSize: 6 },
    '',
    {
      text:
        dealType === DealTypeEnum.CHANNEL
          ? quoteProductTotals.netPrice
          : quoteProductTotals.customerPrice,
      bold: true,
      fontSize: 6,
    },
  ];
  if (dealType === DealTypeEnum.CHANNEL) {
    grandTotal.unshift('');
  }

  const totals = [total, tax, grandTotal];

  return totals;
}

function getQuoteProduct(dealType: DealTypeEnum, quoteProduct: QuoteProduct) {
  const hasIndentation = /^\u200B\t/.test(quoteProduct.productName);

  let productName = quoteProduct.productName;
  if (hasIndentation)
    productName = quoteProduct.productName.replace(/\u200B\t/g, '');

  const product = [
    {
      text: productName,
      margin: [hasIndentation ? 10 : 0, 0, 0, 0],
    },
    {
      text: quoteProduct.transactionType,
    },
    {
      text: `${quoteProduct.startDate.formattedValue} - ${quoteProduct.endDate.formattedValue}`,
    },
    {
      text: quoteProduct.quantity.formattedValue,
    },
    {
      text: quoteProduct.listPrice.formattedValue,
    },
    {
      text: quoteProduct.totalCustomerDiscount.formattedValue,
    },
    {
      text: quoteProduct.customerPrice.formattedValue,
    },
    {
      text: quoteProduct.netPrice.formattedValue,
    },
  ];

  if (dealType === DealTypeEnum.CHANNEL) {
    product.push({ text: quoteProduct.totalChannelDiscount.formattedValue });
  }

  return product;
}
