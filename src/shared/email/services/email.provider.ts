// Dependencies
import { Inject, Injectable } from '@nestjs/common';
import { MailService, MailDataRequired } from '@sendgrid/mail';

// Types
import { ProviderEmailDataDTO } from '../dto/email-provider/email-data-provider.dto';

@Injectable()
export class EmailProvider {
  constructor(
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}

  async sendEmail(providerEmailData: ProviderEmailDataDTO) {
    const { from, to, dynamicTemplateData, templateId, attachment } =
      providerEmailData;
    const { subject } = dynamicTemplateData;

    const emailData: MailDataRequired = {
      subject,
      from,
      personalizations: [
        {
          to,
          dynamicTemplateData,
        },
      ],
      templateId,
    };

    if (attachment?.content) {
      emailData.attachments = [
        {
          content: attachment.content,
          filename: attachment.filename,
          type: attachment.type,
        },
      ];
    }

    const result = await this.mailService.send(emailData);

    return {
      messageId: result[0].headers['x-message-id'],
      providerEmailData,
    };
  }
}
