import { EmailAddress } from '../../types/email-address.type';

export class QuoteTransactEmailDTO {
  quoteId: number;
  quoteName: string;
  quoteNetAmount: number;
  quoteCurrency: string;
  quoteUpdatedAt: Date;
  customerName: string;
  emailList: EmailAddress[];
}
