// Dependencies
import { registerAs } from '@nestjs/config';

// Configs
import { IEmailConfig } from './interfaces/email-config.interface';

export default registerAs(
  'Email',
  (): IEmailConfig => ({
    appRootUrl: process.env.APP_ROOT_URL,
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    quoteVendoChangeTemplateId: process.env.MAIL_QUOTE_VENDO_CHANGE_TEMPLATE_ID,
    customerUpdateTemplateId: process.env.MAIL_CUSTOMER_UPDATE_TEMPLATE_ID,
    batchedUpdateTemplateId: process.env.MAIL_BATCHED_UPDATE_TEMPLATE_ID,
    userInviteTemplateId: process.env.MAIL_USER_INVITE_TEMPLATE_ID,
    vendoriSupportEmail: process.env.VENDORI_SUPPORT_EMAIL || 'app@vendori.com',
    vendoriInternalReceptionEmail: process.env.VENDORI_INTERNAL_RECEPTION_EMAIL,
    vendoriInternalSupportEmail: process.env.VENDORI_INTERNAL_SUPPORT_EMAIL,
    quoteConfirmationPath: process.env.MAIL_QUOTE_CONFIRMATION_PATH,
    vendoConfirmationPath: process.env.MAIL_VENDO_CONFIRMATION_PATH,
    frontendRedirectUrl: process.env.EMAIL_FRONTEND_REDIRECT,
    vendoriLogoUrl:
      process.env.VENDORI_LOGO_URL ||
      'https://staging.vendori.com/images/DarkLogo.svg',
    vendoriCompanyAddress:
      process.env.VENDORI_COMPANY_ADDRESS ||
      'Vendori, Inc. <br/> 1700 Northside Dr., Suite A7-2738, Atlanta, GA 30318',
  }),
);
