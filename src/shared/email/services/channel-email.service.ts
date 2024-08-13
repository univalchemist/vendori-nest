// Dependencies
import { Injectable } from '@nestjs/common';

// DTOs
import { ChannelRequestEmailDTO } from '../dto/channel-email/channel-request-email.dto';

// Services
import { EmailProvider } from './email.provider';
import { BaseEmailService } from './base-email.service';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';

@Injectable()
export class ChannelEmailService extends BaseEmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    protected readonly emailConfig: IEmailConfig,
  ) {
    super(emailConfig);
  }

  async sendChannelRequestEmail(dto: ChannelRequestEmailDTO) {
    const subject = `${dto.name} would like a new channel added`;
    const providerEmailData = this.getProviderEmailData({
      subject,
      body: `
        Channel Requested: <br/><br/> <strong> ${dto.partnerName} <br/> ${dto.website} <br/> ${dto.contactEmail} </strong>
      `.replace(/\s+/g, ' '),
      emailList: [
        {
          name: 'Vendori',
          email: this.emailConfig.vendoriInternalSupportEmail,
        },
      ],
      templateId: this.emailConfig.userInviteTemplateId,
      showButton: false,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }
}
