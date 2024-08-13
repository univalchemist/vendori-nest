import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ISalesforceMetaData } from '../salesforce.types/salesforce.sf_metadata.type';

export class SfQuoteMetadataDto {
  /**
   * The id of Opportunity
   * @example 1
   */
  @IsString()
  @IsOptional()
  @MaxLength(36)
  opportunityId: string;

  /**
   * The salesforce contract id
   * @example 800DN0000000QcVYAU
   */
  @IsString()
  @IsOptional()
  @MaxLength(36)
  sfContractId: string;

  /**
   * The locked fields
   * @example {
   *   "quoteInternalCommentFiles": [],
   *   "dealType": "Direct",
   *   "currency": "USD",
   *   "isAcceptingCreditCard": false,
   *   "isDistributorVisible": false,
   *   "isResellerVisible": false,
   *   "isExternalHideInvoice": false,
   *   "isExternalHideUnit": true,
   *   "isExternalHideContact": false,
   *   "netAmount": 0,
   *   "isLocked": false,
   *   "isExternal": false,
   *   "isBlackBox": false,
   *   "quoteInternalComments": "",
   *   "quoteComments": "",
   *   "ownerUserId": 14,
   *   "expiresAt": "2023-06-01T05:00:00.000Z",
   *   "isRequiringSigning": true,
   *   "quoteAttributes": [
   *     {
   *       "name": "Net New",
   *       "value": false
   *     },
   *     {
   *       "name": "Expansion",
   *       "value": false
   *     },
   *     {
   *       "name": "Renewal",
   *       "value": false
   *     },
   *     {
   *       "name": "Custom Billing",
   *       "value": false
   *     },
   *     {
   *       "name": "Custom Discount",
   *       "value": false
   *     }
   *   ],
   *   "geoHierarchyId": 1,
   *   "opportunityId": "006DN000002JtRHYA0",
   *   "quoteName": "sprockets v2",
   *   "customerId": 90,
   *   "sfMetaData": {
   *     "account": {
   *       "AccountId": "001DN000005dPuxYAE",
   *       "Name": "SNL",
   *       "Industry": "null",
   *       "Phone": "null",
   *       "Website": "https://codepen.io",
   *       "PhotoUrl": "/services/images/photo/0015f00000LihGxAAJ",
   *       "BillingStreet": "100 Federal Street",
   *       "BillingCity": "Boston",
   *       "BillingState": "MA",
   *       "BillingPostalCode": "02110",
   *       "BillingCountry": "US",
   *       "BillingLatitude": null,
   *       "BillingLongitude": null,
   *       "BillingGeocodeAccuracy": null,
   *       "ShippingStreet": "123 Moody Street",
   *       "ShippingCity": "Waltham",
   *       "ShippingState": "MA",
   *       "ShippingPostalCode": "02453",
   *       "ShippingCountry": "US",
   *       "ShippingLatitude": null,
   *       "ShippingLongitude": null,
   *       "ShippingGeocodeAccuracy": null
   *     },
   *     "partners": [],
   *     "contacts": [
   *       {
   *         "sfContactId": "003DN000003SVydYAG",
   *         "sfOpportunityContactRoleId": "006DN000002JtRHYA0",
   *         "imageUrl": "Mike M Myers",
   *         "firstName": "Mike",
   *         "lastName": "Myers",
   *         "email": "123@abc.com",
   *         "phone": "1118675309",
   *         "companyOrganisationName": "",
   *         "timeZoneArea": "",
   *         "isOwner": false,
   *         "isApprover": false,
   *         "type": "Internal",
   *         "showOnPDF": true
   *       },
   *       {
   *         "sfContactId": "003DN000003T2VzYAK",
   *         "sfOpportunityContactRoleId": "006DN000002JtRHYA0",
   *         "imageUrl": "Mu Monkey",
   *         "firstName": "Mu",
   *         "lastName": "Monkey",
   *         "email": "monkey@sprokets.co",
   *         "phone": "+987896545645",
   *         "companyOrganisationName": "",
   *         "timeZoneArea": "",
   *         "isOwner": false,
   *         "isApprover": false,
   *         "type": "Internal",
   *         "showOnPDF": true
   *       }
   *     ]
   *   }
   * }
   */
  @IsObject()
  // @IsNotEmpty()
  @IsOptional()
  sfMetaData: ISalesforceMetaData;

  /**
   * If quote is primary
   * @example true
   */
  @IsBoolean()
  @IsOptional()
  isPrimary: boolean;
}
