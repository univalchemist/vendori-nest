export type QuoteProduct = {
  productName: string;
  transactionType: string;
  startDate: {
    value: Date;
    formattedValue: string;
  };
  endDate: {
    value: Date | string;
    formattedValue: string;
  };
  quantity: {
    value: number;
    formattedValue: number;
  };
  listPrice: {
    value: number;
    formattedValue: string;
  };
  totalCustomerDiscount: {
    value: number;
    formattedValue: number | string;
  };
  customerPrice: {
    value: number;
    formattedValue: string;
  };
  totalChannelDiscount?: {
    value: number;
    formattedValue: number | string;
  };
  netPrice?: {
    value: number;
    formattedValue: string;
  };
};

export type QuoteProductTotals = {
  quantity: number;
  listPrice: number;
  customerPrice: number;
  netPrice?: number;
};

export type QuoteProductTotalsTransformed = {
  quantity: number | string;
  listPrice: number | string;
  customerPrice: number | string;
  netPrice?: number | string;
};
