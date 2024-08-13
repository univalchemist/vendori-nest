export type VendoTableData = {
  quoteName: string;
  quoteUuid: string;
  currency: string;
  quoteStatus: string;
  products: any[];
  startDate: {
    value: Date | string;
    formattedValue: string;
  };
  endDate: {
    value: Date | string;
    formattedValue: string;
  };
  oneTimeQty: {
    value: number;
    formattedValue: number;
  };
  subscriptionQty: {
    value: number;
    formattedValue: number;
  };
  consumptionQty: {
    value: number;
    formattedValue: number;
  };
  totalNetCost: {
    value: number;
    formattedValue: string;
  };
};
