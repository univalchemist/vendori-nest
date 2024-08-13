import { EmailAddress } from '../../types/email-address.type';

export class QuoteApprovedEmailDTO {
  quoteId: number;
  quoteName: string;
  quoteStatus: string;
  quoteNetAmount: number;
  quoteCurrency: string;
  companyName: string;
  customerRegion: string;
  emailList: EmailAddress[];
}
