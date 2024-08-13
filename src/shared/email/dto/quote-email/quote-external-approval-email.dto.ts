import { EmailAddress } from '../../types/email-address.type';

export class QuoteExternalApprovalEmailDTO {
  quoteId: number;
  pinCode: string;
  companyName: string;
  subdomain: string;
  accessToken: string;
  ownerName: string;
  ownerPhone: string;
  emailList: EmailAddress[];
}
