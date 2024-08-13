import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OemNotification } from './oem-notification.entity';
import { OemNotificationsService } from './oem-notifications.service';
import { OemNotificationsController } from './oem-notifications.controller';
import { EmailModule } from '../../../../shared/email/email.module';
import { NotificationPreference } from '../oem-notification-preferences/oem-notification-preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OemNotification, NotificationPreference]),
    EmailModule,
  ],
  providers: [OemNotificationsService],
  exports: [OemNotificationsService],
  controllers: [OemNotificationsController],
})
export class OemNotificationsModule {}
