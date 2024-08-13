import { EmailAddress } from '../../types/email-address.type';

export class QuoteRejectedEmailDTO {
  quoteId: number;
  quoteName: string;
  quoteNetAmount: number;
  quoteCurrency: string;
  companyName: string;
  customerRegion: string;
  rejectedRoleType: string;
  emailList: EmailAddress[];
}
