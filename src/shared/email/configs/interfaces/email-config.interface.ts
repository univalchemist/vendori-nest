export interface IEmailConfig {
  appRootUrl: string;
  sendGridApiKey: string;
  quoteVendoChangeTemplateId: string;
  customerUpdateTemplateId: string;
  batchedUpdateTemplateId: string;
  userInviteTemplateId: string;
  vendoriSupportEmail: string;
  vendoriInternalReceptionEmail: string;
  vendoriInternalSupportEmail: string;
  quoteConfirmationPath: string;
  vendoConfirmationPath: string;
  frontendRedirectUrl: string;
  vendoriLogoUrl: string;
  vendoriCompanyAddress: string;
}
