import {
  Action,
  Crud,
  CrudController,
  CrudRequest,
  CrudRequestInterceptor,
  Feature,
  ParsedRequest,
} from '@nestjsx/crud';
import { OemWorkflowRule } from '../oem-workflow-rules/oem-workflow-rule.entity';
import { dto, serialize } from '../oem-workflow-rules/oem-workflow-rule.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { SessionAuthGuard } from '../../../../auth/guards/session-auth.guard';
import { JWTAuthGuard } from '../../../../auth/guards/jwt-auth.guard';
import { SetCurrentUser } from '../../oem-users/oem-users.decorators/set-current-user.decorator';
import { BulkIdsDto } from '../../../../common/dtos/bulk-ids.dto';
import { RoleActions } from '../../../../auth/roles/types/role-actions.enum';
import { ActionTypeEnum, RuleActionDto } from './oem-rule-actions.dto';
import { NotificationRuleType } from '../../oem-notifications/oem-notifications/oem-notifications.service';
import { OemNotificationFrequencyType } from '../../oem-notifications/oem-notification-preferences/oem-notification-preference.enums/oem-notification-preference.frequency-type.enum';
import { OemQuotesService } from '../../oem-quotes/oem-quotes.service';
import { OemRuleActionsService } from './oem-rule-actions.service';

@ApiTags('Rule Actions')
@Controller('rule-actions')
@Feature('Rule-Actions')
@ApiBearerAuth('JWT-auth')
@UseGuards(SessionAuthGuard, JWTAuthGuard)
@SetCurrentUser
export class OemRuleActionsController {
  constructor(public service: OemRuleActionsService) {}
  @ApiOperation({
    description: 'Set actions',
  })
  @ApiBody({ type: RuleActionDto })
  @HttpCode(HttpStatus.OK)
  @Post()
  @Action(RoleActions.Read)
  @UseInterceptors(CrudRequestInterceptor)
  resolve(@ParsedRequest() req: CrudRequest, @Body() dto: RuleActionDto) {
    return this.service.resolve(req, dto);
  }
}
