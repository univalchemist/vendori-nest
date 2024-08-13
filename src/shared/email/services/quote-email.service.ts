// Dependencies
import { Injectable } from '@nestjs/common';
// TODO: create momentService and inject it because currently moment doesn't provide a constructor
import * as moment from 'moment-timezone';

// Services
import { EmailProvider } from './email.provider';
import { BaseEmailService } from './base-email.service';

// Shared
// TODO: create a separate DineroServie and inject it
import { newDineroDollars } from '../../dinero';

// DTOs
import { QuoteApprovalEmailDTO } from '../dto/quote-email/quote-approval-email.dto';
import { QuoteSubmitEmailDTO } from '../dto/quote-email/quote-submit-email.dto';
import { QuoteExternalApprovalEmailDTO } from '../dto/quote-email/quote-external-approval-email.dto';
import { QuoteApprovedEmailDTO } from '../dto/quote-email/quote-approved-email.dto';
import { QuoteRejectedEmailDTO } from '../dto/quote-email/quote-rejected-email.dto';
import { QuoteExpiredEmailDTO } from '../dto/quote-email/quote-expired-email.dto';
import { QuoteTransactEmailDTO } from '../dto/quote-email/quote-transacted-email.dto';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';
import { Dinero } from 'dinero.js';

@Injectable()
export class QuoteEmailService extends BaseEmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    protected readonly emailConfig: IEmailConfig,
  ) {
    super(emailConfig);
  }

  async sendApprovalEmail(dto: QuoteApprovalEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const subject = `Quote ${dto.quoteName} is ready for review`;

    const netAmount = newDineroDollars(
      dto.quoteNetAmount,
      dto.quoteCurrency as Dinero.Currency,
    ).toFormat('$0,0.00');

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `
        ${dto.ownerName} has submitted a quote that requires your approval.<br/><br/>
        <strong> ${dto.customerName} | ${netAmount} | ${dto.quoteUuid} </strong> <br/><br/>
        Please click below to review the quote and approve or deny it.
      `,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendSubmittedEmail(dto: QuoteSubmitEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const subject = `${dto.ownerName} has submitted a proposal!`;
    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `
        To view this proposal, please click below.<br/><br/>
        <strong> ${dto.companyName} | ${dto.ownerPhone} </strong>
      `,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendExternalApprovalEmail(dto: QuoteExternalApprovalEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const confirmationLink = `https://${dto.subdomain}.vendori.com/${this.emailConfig.quoteConfirmationPath}/${dto.quoteId}?access_token=${dto.accessToken}`;

    const subject = `${dto.ownerName} has sent you a proposal!`;
    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: confirmationLink,
      body: `
        <br/><br/> PIN CODE: ${dto.pinCode}<br/>
        To view and approve this proposal, please click below.<br/><br/>
        <br/><br/>
        <strong> ${dto.companyName} | ${dto.ownerPhone} </strong>
      `,
      emailList: dto.emailList,
      templateId: this.emailConfig.customerUpdateTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendApprovedEmail(dto: QuoteApprovedEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const subject = `Quote ${dto.quoteName} has been ${dto.quoteStatus}`;
    const netAmount = newDineroDollars(
      dto.quoteNetAmount,
      dto.quoteCurrency as Dinero.Currency,
    ).toFormat('$0,0.00');

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `Quote ${dto.quoteName} has been ${dto.quoteStatus}.<br/><br/> <strong> ${dto.companyName} | ${netAmount} | ${dto.customerRegion} </strong>`,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendRejectedEmail(dto: QuoteRejectedEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const rejectedRoleType = dto.rejectedRoleType || 'Customer';

    const subject = `Quote ${dto.quoteName} has been rejected`;
    const netAmount = newDineroDollars(
      dto.quoteNetAmount,
      dto.quoteCurrency as Dinero.Currency,
    ).toFormat('$0,0.00');

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `${rejectedRoleType} rejected the quote.<br/><br/> <strong> ${dto.companyName} | ${netAmount} | ${dto.customerRegion} </strong>`,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendExpiredEmail(dto: QuoteExpiredEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const subject = `Quote ${dto.quoteName} has been expired`;
    const netAmount = newDineroDollars(
      dto.quoteNetAmount,
      dto.quoteCurrency as Dinero.Currency,
    ).toFormat('$0,0.00');

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `The expiration date ${dto.quoteExpiresAt} has been reached and the quote is now expired.<br/><br/> <strong> ${dto.companyName} | ${netAmount} | ${dto.customerRegion} </strong>`,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }

  async sendTransactedEmail(dto: QuoteTransactEmailDTO) {
    if (!dto.emailList?.length) {
      return null;
    }

    const subject = `Congratulations!<br>${dto.customerName} has accepted your quote!`;

    const transactedDateMoment = moment.utc(dto.quoteUpdatedAt);
    const transactedTime = transactedDateMoment.format('HH:mm A');
    const transactedDate = transactedDateMoment.format('MM/DD/YYYY');
    const netAmount = newDineroDollars(
      dto.quoteNetAmount,
      dto.quoteCurrency as Dinero.Currency,
    ).toFormat('$0,0.00');

    const providerEmailData = this.getProviderEmailData({
      subject,
      cta: `${this.emailConfig.appRootUrl}/quotes/${dto.quoteId}`,
      body: `At ${transactedTime} on ${transactedDate}, ${dto.customerName} accepted Quote ${dto.quoteName}.<br/><br/> <strong> ${dto.customerName} | ${netAmount} </strong>`,
      emailList: dto.emailList,
      templateId: this.emailConfig.quoteVendoChangeTemplateId,
    });

    return this.emailProvider.sendEmail(providerEmailData);
  }
}
