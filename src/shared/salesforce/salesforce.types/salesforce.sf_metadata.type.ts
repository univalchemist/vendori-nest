import { QuoteUserTypeEnum } from '../../../oem/intermediaries/_oem-quotes-users/oem-quotes-users.enums/quoteUserTypeEnum';

export interface ISalesforceMetaData {
  account: {
    AccountId: string;
    Name: string;
    Industry: string | null;
    Phone: string | null;
    Website: string | null;
    PhotoUrl: string | null;
    BillingStreet: string | null;
    BillingCity: string | null;
    BillingState: string | null;
    BillingPostalCode: string | null;
    BillingCountry: string | null;
    BillingLatitude: string | null;
    BillingLongitude: string | null;
    BillingGeocodeAccuracy: string | null;
    ShippingCity: string | null;
    ShippingState: string | null;
    ShippingPostalCode: string | null;
    ShippingCountry: string | null;
    ShippingLatitude: string | null;
    ShippingLongitude: string | null;
    ShippingGeocodeAccuracy: string | null;
  };
  partners: [
    {
      PartnerId: string;
      Role: string;
      Name: string;
      Industry: string | null;
      Phone: string | null;
      Website: string | null;
      PhotoUrl: string | null;
      BillingStreet: string | null;
      BillingCity: string | null;
      BillingState: string | null;
      BillingPostalCode: string | null;
      BillingCountry: string | null;
      BillingLatitude: string | null;
      BillingLongitude: string | null;
      BillingGeocodeAccuracy: string | null;
      ShippingCity: string | null;
      ShippingState: string | null;
      ShippingPostalCode: string | null;
      ShippingCountry: string | null;
      ShippingLatitude: string | null;
      ShippingLongitude: string | null;
      ShippingGeocodeAccuracy: string | null;
    },
  ];
  contacts?: [
    {
      sfContactId: string;
      sfOpportunityContactRoleId: string;
      imageUrl?: string | null;
      firstName: string;
      lastName: string;
      email: string;
      phone: string | null;
      companyOrganisationName: string | null;
      timeZoneArea: string | null;
      isOwner: boolean;
      isApprover: boolean;
      type: string | QuoteUserTypeEnum;
      showOnPDF: boolean;
    },
  ];
}

export interface ISalesforceMetaDataRequest {
  quoteInternalCommentFiles: [];
  dealType: string | null;
  currency: string | null;
  isAcceptingCreditCard: boolean;
  isDistributorVisible: boolean;
  isResellerVisible: boolean;
  isExternalHideInvoice: boolean;
  isExternalHideUnit: boolean;
  isExternalHideContact: boolean;
  netAmount: number;
  isLocked: boolean;
  isExternal: boolean;
  isBlackBox: boolean;
  quoteInternalComments: string | null;
  quoteComments: string | null;
  ownerUserId: number;
  expiresAt: string | null;
  isRequiringSigning: boolean;
  quoteAttributes: object[];
  geoHierarchyId: number | null;
  opportunityId: string;
  quoteName: string;
  customerId: number;
  sfMetaData: ISalesforceMetaData;
}
