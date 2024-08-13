import { EmailAddress } from '../../types/email-address.type';

export class QuoteExpiredEmailDTO {
  quoteId: number;
  quoteName: string;
  quoteNetAmount: number;
  quoteCurrency: string;
  quoteExpiresAt: Date;
  companyName: string;
  customerRegion: string;
  emailList: EmailAddress[];
}
