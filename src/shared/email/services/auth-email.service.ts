// Dependencies
import { Injectable } from '@nestjs/common';

// Services
import { EmailProvider } from './email.provider';
import { BaseEmailService } from './base-email.service';

// DTOs
import { LoginEmailDTO } from '../dto/auth-email/login-email.dto';

// Interfaces
import { IEmailConfig } from '../configs/interfaces/email-config.interface';
import { NODE_ENV } from '../../../environments';

@Injectable()
export class AuthEmailService extends BaseEmailService {
  constructor(
    private readonly emailProvider: EmailProvider,
    protected readonly emailConfig: IEmailConfig,
  ) {
    super(emailConfig);
  }

  async sendLoginEmail(dto: LoginEmailDTO) {
    // if (user.isExternal || !user.isActive || !user.isEnabled)
    //   throw 'Please enter a valid login email with a user that has platform access.';
    //
    // const subject = `Your Vendori Email Login Link`;
    // const redirectPartLink = this.emailConfig.frontendRedirectUrl.split('://');
    // const subdomain = NODE_ENV === 'production' ? 'app' : NODE_ENV;
    // const cta = `${redirectPartLink[0]}://${subdomain}.${redirectPartLink[1]}?access_token=${dto.accessToken}`;
    //
    // const providerEmailData = this.getProviderEmailData({
    //   subject,
    //   cta,
    //   body: 'To login to Vendori, please click link below',
    //   emailList: dto.emailList,
    //   ctaText: 'Login',
    //   templateId: this.emailConfig.userInviteTemplateId,
    // });
    //
    // return this.emailProvider.sendEmail(providerEmailData);
  }
}
