// Types
import { EmailDynamicTemplate } from '../types/email-dynamic-template.type';
import { ProviderEmailDataDTO } from '../dto/email-provider/email-data-provider.dto';
import { EmailAttachmentType } from '../types/email-attachment.type';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';

// DTOs
import { DynamicTemplateDTO } from '../dto/base-email/dynamic-template.dto';
import { EmailDataDTO } from '../dto/base-email/email-data.dto';

export class BaseEmailService {
  constructor(protected readonly emailConfig: IEmailConfig) {}

  private _getDynamicTemplateData({
    subject,
    logoURL = this.emailConfig.vendoriLogoUrl,
    cta,
    body,
    items,
    companyAddress = this.emailConfig.vendoriCompanyAddress,
    isVendo = false,
    emailList,
    showButton = true,
    ctaText,
  }: DynamicTemplateDTO): EmailDynamicTemplate {
    const verifiedEmail =
      emailList?.length === 1 ? emailList[0].email : 'your email';
    // const verifiedFullName = emailList?.length === 1 ? emailList[0].name : '';

    return {
      subject: subject.replace(/<[^>]*>/g, ' '),
      logoURL,
      CTA: cta,
      body: body?.replace(/\s+/g, ' '),
      items,
      companyAddress,
      emailverify: `
      This message was sent to ${verifiedEmail} because you're a user in the Vendori account.
      click <a href="https://demo.vendori.com/manage-alerts">here</a> to view your in-app notification settings.
      `.replace(/\s+/g, ' '), // ${verifiedFullName}
      isVendo,
      showButton,
      ctaText,
    };
  }

  protected getProviderEmailData(
    emailData: EmailDataDTO,
  ): ProviderEmailDataDTO {
    const dynamicTemplateData = this._getDynamicTemplateData(emailData);

    let attachment: EmailAttachmentType;
    if (emailData.file?.buffer) {
      const fileType = emailData.file.mimetype?.split('/')[1];
      const filename = fileType ? `attachment.${fileType}` : 'attachment';

      attachment = {
        content: emailData.file.buffer.toString('base64'),
        filename,
        type: emailData.file.mimetype,
      };
    }

    return {
      from: {
        name: 'Vendori',
        email: this.emailConfig.vendoriSupportEmail,
      },
      to: emailData.emailList,
      templateId: emailData.templateId,
      dynamicTemplateData,
      attachment,
    };
  }
}
