import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsDefined,
  IsEnum,
  IsMilitaryTime,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type, TypeHelpOptions } from 'class-transformer';
import { NotificationRuleType } from '../../oem-notifications/oem-notifications/oem-notifications.service';
import { OemNotificationFrequencyType } from '../../oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.frequency-type.enum';
import { OemNotificationWeeklyValue } from '../../oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.weekly-value.enum';
import { OemNotificationMonthlyValue } from '../../oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.monthly-value.enum';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

import { omit } from 'lodash';
import { StrictUnion } from '../../../../utils/strict-union-type.util';

export enum ActionTypeEnum {
  NOTIFY = 'NOTIFY',
  AUTO_APPROVE = 'AUTO_APPROVE',
  AUTO_REJECT = 'AUTO_REJECT',
}

// Schedule structure
export class ScheduleDailyDto {
  @ApiProperty({ type: () => OemNotificationFrequencyType.DAILY })
  @Equals(OemNotificationFrequencyType.DAILY)
  frequency: OemNotificationFrequencyType.DAILY;
  @IsMilitaryTime()
  dailyFrequencyValue: string;
}

export class ScheduleWeekDto {
  @ApiProperty({ type: () => OemNotificationFrequencyType.WEEKLY })
  @Equals(OemNotificationFrequencyType.WEEKLY)
  frequency: OemNotificationFrequencyType.WEEKLY;
  @IsEnum(OemNotificationWeeklyValue)
  weeklyFrequencyValue: OemNotificationWeeklyValue;
  @IsMilitaryTime()
  dailyFrequencyValue: string;
}

export class ScheduleMonthlyDto {
  @ApiProperty({ type: () => OemNotificationFrequencyType.MONTHLY })
  @Equals(OemNotificationFrequencyType.MONTHLY)
  frequency: OemNotificationFrequencyType.MONTHLY;
  @IsEnum(OemNotificationMonthlyValue)
  monthlyFrequencyValue: OemNotificationMonthlyValue;
  @IsMilitaryTime()
  dailyFrequencyValue: string;
}

// Notification Structure
@ApiExtraModels(ScheduleDailyDto, ScheduleWeekDto, ScheduleMonthlyDto)
class NotificationDto {
  @IsNumber()
  quoteId: number;
  @IsNumber()
  userId: number;
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(ScheduleDailyDto) },
      { $ref: getSchemaPath(ScheduleWeekDto) },
      { $ref: getSchemaPath(ScheduleMonthlyDto) },
    ],
  })
  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type((data: TypeHelpOptions) => {
    switch (data.object.schedule.frequency) {
      case OemNotificationFrequencyType.DAILY:
        return ScheduleDailyDto;
      case OemNotificationFrequencyType.WEEKLY:
        return ScheduleWeekDto;
      case OemNotificationFrequencyType.MONTHLY:
        return ScheduleMonthlyDto;
    }
  })
  schedule: StrictUnion<
    ScheduleDailyDto | ScheduleWeekDto | ScheduleMonthlyDto
  >;
}

class NotificationRejectedDto extends NotificationDto {
  @IsNumber()
  quoteApprovalQueueId: number;
}

const NotificationRejected = {
  [NotificationRuleType.REJECTED_EXTERNALLY]:
    NotificationRuleType.REJECTED_EXTERNALLY,
  [NotificationRuleType.REJECTED_INTERNALLY]:
    NotificationRuleType.REJECTED_INTERNALLY,
};

// Notify Structure
class NotifyOptionsRejected {
  @ApiProperty({ enum: NotificationRejected })
  @IsEnum(NotificationRejected)
  notificationRuleType:
    | NotificationRuleType.REJECTED_EXTERNALLY
    | NotificationRuleType.REJECTED_INTERNALLY;
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true })
  @Type(() => NotificationRejectedDto)
  bulkNotification: Array<NotificationRejectedDto>;
}

class NotifyOptions {
  @ApiProperty({
    enum: {
      ...omit(NotificationRuleType, [
        NotificationRuleType.REJECTED_EXTERNALLY,
        NotificationRuleType.REJECTED_INTERNALLY,
      ]),
    },
  })
  @IsEnum(NotificationRuleType)
  notificationRuleType: Exclude<
    NotificationRuleType,
    | NotificationRuleType.REJECTED_EXTERNALLY
    | NotificationRuleType.REJECTED_INTERNALLY
  >;
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1000)
  @ValidateNested({ each: true })
  @Type(() => NotificationDto)
  bulkNotification: Array<NotificationDto>;
}

// Workflow Structure
class WorkflowOptions {
  @IsNumber()
  quoteId: number;
}

// Rule Structure
@ApiExtraModels(NotifyOptionsRejected, NotifyOptions)
export class RuleActionNotify {
  @ApiProperty({ type: () => ActionTypeEnum.NOTIFY })
  @Equals(ActionTypeEnum.NOTIFY)
  actionType: ActionTypeEnum.NOTIFY;
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(NotifyOptionsRejected) },
      { $ref: getSchemaPath(NotifyOptions) },
    ],
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type((data: TypeHelpOptions) => {
    switch (data.object.options.notificationRuleType) {
      case NotificationRuleType.REJECTED_INTERNALLY:
        return NotifyOptionsRejected;
      case NotificationRuleType.REJECTED_EXTERNALLY:
        return NotifyOptionsRejected;
      default:
        return NotifyOptions;
    }
  })
  options: StrictUnion<NotifyOptionsRejected | NotifyOptions>;
}

export class RuleActionAutoApprove {
  @ApiProperty({ type: () => ActionTypeEnum.AUTO_APPROVE })
  @Equals(ActionTypeEnum.AUTO_APPROVE)
  actionType: ActionTypeEnum.AUTO_APPROVE;
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => WorkflowOptions)
  options: WorkflowOptions;
}

export class RuleActionAutoReject {
  @ApiProperty({ type: () => ActionTypeEnum.AUTO_REJECT })
  @Equals(ActionTypeEnum.AUTO_REJECT)
  actionType: ActionTypeEnum.AUTO_REJECT;
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => WorkflowOptions)
  options: WorkflowOptions;
}

@ApiExtraModels(RuleActionNotify, RuleActionAutoApprove, RuleActionAutoReject)
export class RuleActionDto {
  @ApiProperty({
    default: {
      actionType: ActionTypeEnum.NOTIFY,
      options: {
        notificationRuleType: NotificationRuleType.REJECTED_INTERNALLY,
        bulkNotification: [
          {
            quoteId: 1,
            userId: 2,
            quoteApprovalQueueId: 3,
            schedule: {
              frequency: OemNotificationFrequencyType.DAILY,
              dailyFrequencyValue: '21:13',
            },
          },
        ],
      },
    },
    oneOf: [
      { $ref: getSchemaPath(RuleActionNotify) },
      { $ref: getSchemaPath(RuleActionAutoApprove) },
      { $ref: getSchemaPath(RuleActionAutoReject) },
    ],
  })
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type((data: TypeHelpOptions) => {
    switch (data.object.action.actionType) {
      case ActionTypeEnum.NOTIFY:
        return RuleActionNotify;
      case ActionTypeEnum.AUTO_APPROVE:
        return RuleActionAutoApprove;
      case ActionTypeEnum.AUTO_REJECT:
        return RuleActionAutoReject;
    }
  })
  action: StrictUnion<
    RuleActionNotify | RuleActionAutoApprove | RuleActionAutoReject
  >;
}

export { RuleActionDto as OemRuleActionDto };
