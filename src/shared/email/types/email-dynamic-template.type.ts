import { EmailItem } from './email-item.type';

export type EmailDynamicTemplate = {
  CTA?: string;
  subject: string;
  body?: string;
  items?: EmailItem[];
  ctaText?: string;

  companyAddress: string;
  emailverify?: string;
  isVendo?: boolean;
  logoURL?: string;
  showButton?: boolean;
};
