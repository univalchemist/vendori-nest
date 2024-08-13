import { QuoteTemplateEnum } from '../oem-company.enums';

export class SettingsType {
  customListPriceName: string;
  customCustomerPriceName: string;
  companyPrimaryColor: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  startingQuoteNumber: number;
  defaultPaymentTerms: string;
  quoteTemplateType: QuoteTemplateEnum;
}
