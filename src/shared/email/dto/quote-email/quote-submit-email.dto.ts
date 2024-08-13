import { EmailAddress } from '../../types/email-address.type';

export class QuoteSubmitEmailDTO {
  quoteId: number;
  companyName: string;
  ownerName: string;
  ownerPhone: string;
  emailList: EmailAddress[];
}
