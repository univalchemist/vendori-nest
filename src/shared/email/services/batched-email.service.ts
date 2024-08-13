// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { EmailProvider } from './email.provider';
import { BaseEmailService } from './base-email.service';

// DTOs
import { BatchedEmailDTO } from '../dto/batched-email/batched-email.dto';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';

@Injectable()
export class BatchedEmailService extends BaseEmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    protected readonly emailConfig: IEmailConfig,
  ) {
    super(emailConfig);
  }

  async sendBatchedEmail(dto: BatchedEmailDTO) {
    const subject = 'Here are your notifications based on your preference';

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/manage-alerts`,
      items: dto.items,
      emailList: dto.emailList,
      templateId: this.emailConfig.batchedUpdateTemplateId,
      showButton: false,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }
}
