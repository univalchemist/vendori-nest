export type EmailAddress = {
  name?: string;
  email: string;
};

export type EmailDynamicTemplate = {
  logoURL?: string;

  subject: string;
  subtitle?: string;

  body?: string;
  items?: {
    imageURL: string;
    formattedText: string;
  }[];
  CTA?: string;
  ctaText?: string;

  subtext?: string;
  companyAddress: string;
  emailverify?: string;
  isVendo?: boolean;
  showButton?: boolean;
};

export type EmailAttachmentType = {
  content: string;
  filename: string;
  type: string;
};

export type EmailMessage = {
  subject: string;
  from: EmailAddress;
  to: EmailAddress[];
  cc?: EmailAddress[];
  templateId: string;
  dynamicTemplateData: EmailDynamicTemplate;
  attachment?: EmailAttachmentType;
};

export type SendEmailResult = { headers: { 'x-message-id': string } }[];
