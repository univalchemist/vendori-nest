// Dependencies
import { FactoryProvider, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from '@sendgrid/mail';

// Configs
import emailConfig from './configs/email.config';

// Interfaces
import { IEmailConfig } from './configs/interfaces/email-config.interface';

// Services
import { EmailProvider } from './services/email.provider';
import { QuoteEmailService } from './services/quote-email.service';
import { AuthEmailService } from './services/auth-email.service';
import { ChannelEmailService } from './services/channel-email.service';
import { SupportEmailService } from './services/support-email.service';
import { BatchedEmailService } from './services/batched-email.service';

//Utils
import { IConstructable } from '../../utils/constructable-interface.util';
import { createInstance } from '../../utils/create-instance.util';

const MailServiceSendgridProvider: Provider = {
  provide: 'MailServiceSendgrid',
  useClass: MailService,
};

function getEmailServiceFactory<
  T extends {
    new (emailProvider: EmailProvider, emailConfig: IEmailConfig): any;
  },
>(factoryClass: T): FactoryProvider<T> {
  return {
    provide: factoryClass,
    useFactory: (emailProvider: EmailProvider, configService: ConfigService) =>
      new factoryClass(emailProvider, configService.get<IEmailConfig>('Email')),
    inject: [EmailProvider, ConfigService],
  };
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
    }),
  ],
  providers: [
    MailServiceSendgridProvider,
    {
      provide: MailService,
      useFactory: (
        _MailService: IConstructable<MailService>,
        configService: ConfigService,
      ) => {
        const mailService = createInstance(_MailService);
        const emailConfig = configService.get<IEmailConfig>(
          'Email',
        );
        mailService['setApiKey'](emailConfig.sendGridApiKey);
        return mailService;
      },
      inject: ['MailServiceSendgrid', ConfigService],
    },
    EmailProvider,
    getEmailServiceFactory(AuthEmailService),
    getEmailServiceFactory(BatchedEmailService),
    getEmailServiceFactory(ChannelEmailService),
    getEmailServiceFactory(QuoteEmailService),
    getEmailServiceFactory(SupportEmailService),
  ],
  exports: [
    AuthEmailService,
    BatchedEmailService,
    ChannelEmailService,
    QuoteEmailService,
    SupportEmailService,
  ],
  controllers: [],
})
export class EmailModule {}
