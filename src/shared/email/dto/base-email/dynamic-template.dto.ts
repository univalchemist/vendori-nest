// Types
import { EmailItem } from '../../types/email-item.type';
import { EmailAddress } from '../../types/email-address.type';

export class DynamicTemplateDTO {
  subject: string;
  logoURL?: string;
  cta?: string;
  body?: string;
  items?: EmailItem[];
  companyAddress?: string;
  isVendo?: boolean;
  emailList: EmailAddress[];
  showButton?: boolean;
  ctaText?: string;
}
