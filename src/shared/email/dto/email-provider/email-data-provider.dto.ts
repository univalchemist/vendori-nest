import { EmailAddress } from '../../types/email-address.type';
import { EmailDynamicTemplate } from '../../types/email-dynamic-template.type';
import { EmailAttachmentType } from '../../types/email-attachment.type';

export type ProviderEmailDataDTO = {
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  templateId: string;
  dynamicTemplateData: EmailDynamicTemplate;
  attachment?: EmailAttachmentType;
};
