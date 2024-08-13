// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { EmailProvider } from './email.provider';
import { BaseEmailService } from './base-email.service';

// DTOs
import { SupportEmailDTO } from '../dto/support-email/support-email.dto';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';

@Injectable()
export class SupportEmailService extends BaseEmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    protected readonly emailConfig: IEmailConfig,
  ) {
    super(emailConfig);
  }

  async sendSupportEmail(dto: SupportEmailDTO) {
    const subject = `${dto.userName} requested feedback in the ${dto.feedbackType} category`;

    const providerEmailData = this.getProviderEmailData({
      subject,
      body: dto.message?.replace(/\s+/g, ' '),
      emailList: [
        {
          name: 'Vendori',
          email: this.emailConfig.vendoriInternalSupportEmail,
        },
      ],
      templateId: this.emailConfig.userInviteTemplateId,
      showButton: false,
      file: dto.file,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }
}
