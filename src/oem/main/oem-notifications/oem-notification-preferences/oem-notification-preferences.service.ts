import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import * as moment from 'moment-timezone';

import { OemNotificationPreference } from './oem-notification-preference.entity';
import { OemNotificationPreferenceType } from './oem-notification-preference.enums/oem-notification-preference.type.enum';
import { OemNotificationFrequencyType } from './oem-notification-preference.enums/oem-notification-preference.frequency-type.enum';
import { OemNotificationMonthlyValue } from './oem-notification-preference.enums/oem-notification-preference.monthly-value.enum';
import { OemNotificationWeeklyValue } from './oem-notification-preference.enums/oem-notification-preference.weekly-value.enum';
import { CommonDefaultMethodExtension } from '../../../../common/decorators/common-default-method-extention.decorator';

@Injectable()
@CommonDefaultMethodExtension
export class OemNotificationPreferencesService extends TypeOrmCrudService<OemNotificationPreference> {
  //TODO: need to use injecting for logger
  private readonly logger = new Logger(OemNotificationPreferencesService.name);

  constructor(
    @InjectRepository(OemNotificationPreference)
    public repo: Repository<OemNotificationPreference>,
  ) {
    super(repo);
  }

  isTimeForFrequencyType(
    notificationPreference: OemNotificationPreference,
    frequencyType: OemNotificationFrequencyType,
  ) {
    const { dailyFrequencyValue, weeklyFrequencyValue, monthlyFrequencyValue } =
      notificationPreference;
    const now = moment.utc();
    let dateString: string;
    let time;

    switch (frequencyType) {
      case OemNotificationFrequencyType.NEVER:
        return false;
      case OemNotificationFrequencyType.IMMEDIATELY:
        return true;
      case OemNotificationFrequencyType.DAILY:
        {
          time = moment(dailyFrequencyValue, ['h:mm:ss A', 'HHmm']).format(
            'HH:mm',
          );
          dateString = now
            .clone()
            .hour(time.get('hour'))
            .minute(time.get('minute'))
            .format('YYYY-MM-DD HH:mm');
        }
        break;
      case OemNotificationFrequencyType.WEEKLY:
        {
          const weeks = [
            OemNotificationWeeklyValue.SUNDAY,
            OemNotificationWeeklyValue.MONDAY,
            OemNotificationWeeklyValue.TUESDAY,
            OemNotificationWeeklyValue.WEDNESDAY,
            OemNotificationWeeklyValue.THURSDAY,
            OemNotificationWeeklyValue.FRIDAY,
            OemNotificationWeeklyValue.SATURDAY,
          ];
          const week = weeks.indexOf(weeklyFrequencyValue) || 1;
          time = moment(dailyFrequencyValue, ['h:mm:ss A', 'HHmm']).format(
            'HH:mm',
          );
          dateString = now.clone().week(week)
            .hour(time.get('hour'))
            .minute(time.get('minute'))
            .format('YYYY-MM-DD HH:mm');
        }
        break;
      case OemNotificationFrequencyType.MONTHLY:
        if (monthlyFrequencyValue === OemNotificationMonthlyValue.FIRST) {
          time = moment(dailyFrequencyValue, ['h:mm:ss A', 'HHmm']).format(
            'HH:mm',
          );
          dateString = now
            .clone()
            .startOf('month')
            .hour(time.get('hour'))
            .minute(time.get('minute'))
            .format('YYYY-MM-DD HH:mm');
        } else if (
          monthlyFrequencyValue === OemNotificationMonthlyValue.MIDDLE
        ) {
          time = moment(dailyFrequencyValue, ['h:mm:ss A', 'HHmm']).format(
            'HH:mm',
          );
          dateString = now.clone().day(15)
            .hour(time.get('hour'))
            .minute(time.get('minute'))
            .format('YYYY-MM-DD HH:mm');
        } else {
          time = moment(dailyFrequencyValue, ['h:mm:ss A', 'HHmm']).format(
            'HH:mm',
          );
          dateString = now.clone().endOf('month')
            .hour(time.get('hour'))
            .minute(time.get('minute'))
            .format('YYYY-MM-DD HH:mm');
        }
        break;
      default:
        return true;
    }

    const dispatchMoment = moment.utc(`${dateString}`, 'YYYY-MM-DD HH:mm');
    return dispatchMoment.isSameOrBefore(now);
  }

  isTimeForBatchedEmail(notificationPreference: OemNotificationPreference) {
    const isTime = {
      [OemNotificationPreferenceType.APPROVAL_OR_REJECTION]: true,
      [OemNotificationPreferenceType.OTHER_CHANGES]: true,
      [OemNotificationPreferenceType.SUBMISSION]: true,
      [OemNotificationPreferenceType.TRANSACTION]: true,
    };

    if (!notificationPreference) {
      return isTime;
    }

    isTime[OemNotificationPreferenceType.APPROVAL_OR_REJECTION] =
      this.isTimeForFrequencyType(
        notificationPreference,
        notificationPreference.approvalFrequencyType,
      );
    isTime[OemNotificationPreferenceType.OTHER_CHANGES] =
      this.isTimeForFrequencyType(
        notificationPreference,
        notificationPreference.changeFrequencyType,
      );
    isTime[OemNotificationPreferenceType.SUBMISSION] =
      this.isTimeForFrequencyType(
        notificationPreference,
        notificationPreference.submissionFrequencyType,
      );
    isTime[OemNotificationPreferenceType.TRANSACTION] =
      this.isTimeForFrequencyType(
        notificationPreference,
        notificationPreference.transactionFrequencyType,
      );

    return isTime;
  }
}
