import * as dayjs from 'dayjs';
import { InvoiceScheduleProduct, CompanyColorsType } from '../../types';
import { formatCurrency } from '../formatters';
import { applyVerticalAlignment } from '../lib/vertical-align';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export function declareInvoiceSchedule(
  invoiceScheduleProducts: InvoiceScheduleProduct[],
  invoiceScheduleTableRows: string[][],
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const tableWrapper = getInvoiceScheduleTableWrapper(colors, size);
  const invoiceScheduleTable = getInvoiceScheduleTable(
    invoiceScheduleProducts,
    invoiceScheduleTableRows,
    colors,
    size,
  );

  tableWrapper.table.body.push([invoiceScheduleTable as any]);

  return tableWrapper;
}

function getInvoiceScheduleTableWrapper(
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  return {
    layout: {
      vLineWidth: () => 0,
      hLineWidth: () => 0,
      paddingTop: () => 0,
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingBottom: (rowIndex: number, node: any) =>
        rowIndex === node.table.body.length - 1 ? 0 : 2,
    },
    table: {
      widths: ['*'],
      headerRows: 1,
      body: [],
    },
    // margin: size === 'lg' ? [0, 0, 0, 0] : [0, 0, 0, 0],
  };
}

function getInvoiceScheduleTable(
  invoiceScheduleProducts: InvoiceScheduleProduct[],
  invoiceScheduleTableRows: string[][],
  colors: CompanyColorsType,
  size: 'sm' | 'lg' = 'lg',
) {
  const defaultPadding = size === 'lg' ? 8 : 5;
  const result = {
    layout: {
      hLineWidth: () => 0,
      hLineColor: () => colors.secondary,
      vLineWidth: () => 0,
      fillColor: (rowIndex: number, node: any) => {
        if (rowIndex === node.table.body.length - 1) {
          return null;
        }

        return rowIndex % 2 !== 0 ? colors.secondary : null;
      },
      fillOpacity: 0.7,
      paddingLeft: (rowIndex: number) => (rowIndex === 0 ? defaultPadding : 2),
      paddingBottom: (rowIndex: number) =>
        rowIndex === 0 ? 2 : defaultPadding,
      paddingRight: (rowIndex: number) => (rowIndex === 0 ? 2 : defaultPadding),
      paddingTop: (rowIndex: number, node: any) => {
        // Apply vertical alignment to the first row
        if (rowIndex !== 0) return defaultPadding;

        applyVerticalAlignment(node, rowIndex, 'bottom');

        return 2;
      },
    },
    table: {
      widths: getColumnsWidth(invoiceScheduleProducts.length, size),
      body: [],
    },
    style: 'invoiceScheduleTable',
  };

  result.table.body.push(
    getProductNamesRow(invoiceScheduleProducts, size) as any,
  );

  for (const invoiceScheduleTableRow of invoiceScheduleTableRows) {
    const modifiedRow = invoiceScheduleTableRow.map((cell) => {
      if (dayjs(cell, 'DD/MM/YYYY').isValid()) {
        return {
          text: cell,
          fontSize: size === 'lg' ? 7 : 5,
          bold: true,
          color: '#000',
        };
      } else {
        return {
          text: cell,
          fontSize: size === 'lg' ? 7 : 6,
          color: '#000',
        };
      }
    });

    result.table.body.push(modifiedRow);
  }

  result.table.body.push(getTotals(invoiceScheduleProducts, size) as any);

  return result;
}

function getProductNamesRow(
  invoiceScheduleProducts: InvoiceScheduleProduct[],
  size: 'sm' | 'lg' = 'lg',
) {
  const result = [];

  // Add empty table cell for the first column
  // As we will display dates there
  result.push('');
  const fontSize = size === 'lg' ? 7 : 6;

  for (const invoiceScheduleProduct of invoiceScheduleProducts) {
    result.push({
      text: invoiceScheduleProduct.productName,
      fontSize,
      bold: true,
      color: '#000',
    });
  }

  result.push({
    text: 'Total',
    bold: true,
    fontSize,
    color: '#000',
  });

  return result;
}

function getTotals(
  invoiceScheduleProducts: InvoiceScheduleProduct[],
  size: 'sm' | 'lg' = 'lg',
) {
  const result = [];
  const fontSize = size === 'lg' ? 7 : 6;
  result.push({
    text: 'Grand Total',
    bold: true,
    fontSize,
    color: '#000',
  });

  for (const invoiceScheduleProduct of invoiceScheduleProducts) {
    result.push({
      text: invoiceScheduleProduct.totalProductPrice.formattedValue,
      bold: true,
      fontSize,
      color: '#000',
    });
  }

  const totalRowPrice = invoiceScheduleProducts.reduce<number>(
    (acc, curr) => acc + curr.totalProductPrice.value,
    0,
  );

  result.push({
    text: formatCurrency(totalRowPrice),
    bold: true,
    fontSize,
    color: '#000',
  });

  return result;
}

function getColumnsWidth(numberOfProducts: number, size: 'sm' | 'lg' = 'lg') {
  const result = [];

  result.push(size === 'lg' ? 34 : 31);

  for (let i = 0; i < numberOfProducts + 1; ++i) {
    result.push(size === 'lg' ? 69 : 55);
  }

  return result;
}
