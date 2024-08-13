import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { Company } from './oem-company.entity';
import { PermitCreditCardsEnum, QuoteTemplateEnum } from './oem-company.enums';

define(Company, (faker_) => {
  const company = new Company();

  company.companyName = 'Demo & Co.';
  company.companyEmail = faker.internet.email(); //'Nelle_Luettgen97@hotmail.com';
  company.websiteUrl = 'https://demo.vendori.com';
  company.logoUrl = 'https://demo.vendori.com/images/default-company-logo.png';
  company.defaultQuoteExpiration = 90;
  company.bankName = 'Local Bank #1';
  company.bankAccountNumber = '01234567890';
  company.phone = '+1 (123) 456-7890';
  company.bankRoutingNumber = '123456789';
  company.dealAttributes = [
    'Net New',
    'Expansion',
    'Renewal',
    'Custom Billing',
    'Custom Discount',
  ];
  company.settings = {
    customListPriceName: 'List Price',
    customCustomerPriceName: 'Price To Customer',
    companyPrimaryColor: {
      a: 1,
      r: 74,
      g: 137,
      b: 187,
    },
    defaultPaymentTerms: 'Net 30 Days',
    quoteTemplateType: QuoteTemplateEnum.COLORED_LANDSCAPE,
    startingQuoteNumber: 1,
  };
  company.permitCreditCards = PermitCreditCardsEnum.ALL_PRODUCTS;
  company.isPermitSigning = true;
  company.isEnabled = true;
  company.subdomain = 'demo';
  company.emailDomain = `bloodandtreasure,vendori`;
  company.quoteTemplate = QuoteTemplateEnum.COLORED_LANDSCAPE;

  return company;
});
