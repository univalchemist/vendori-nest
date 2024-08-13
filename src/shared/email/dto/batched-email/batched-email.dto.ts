import { EmailItem } from '../../types/email-item.type';
import { EmailAddress } from '../../types/email-address.type';

export class BatchedEmailDTO {
  items: EmailItem[];
  emailList: EmailAddress[];
}
