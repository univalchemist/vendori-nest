import { EmailAddress } from '../../types/email-address.type';

export class QuoteApprovalEmailDTO {
  quoteId: number;
  quoteName: string;
  quoteNetAmount: number;
  quoteCurrency: string;
  quoteUuid: string;
  ownerName: string;
  customerName: string;
  emailList: EmailAddress[];
}
