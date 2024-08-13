import { ProviderEmailDataDTO } from '../dto/email-provider/email-data-provider.dto';

export type EmailResponse = {
  messageId: string;
  providerEmailData: ProviderEmailDataDTO;
};
