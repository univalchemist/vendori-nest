import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth, CrudController, Feature } from '@nestjsx/crud';

import { OemCompanyChannelSetting } from './oem-company-channel-setting.entity';
import { OemCompanyChannelSettingsService } from './oem-company-channel-settings.service';
import { dto, serialize } from './oem-company-channel-setting.dto';
import { SessionAuthGuard } from '../../../auth/guards/session-auth.guard';
import { JWTAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { SetCurrentUser } from '../../main/oem-users/oem-users.decorators/set-current-user.decorator';
import { RoleSubjects } from '../../../auth/roles/types/role-subjects.type';
import { RolesGuard } from '../../../auth/roles/guards/roles.guard';

@Crud({
  model: {
    type: OemCompanyChannelSetting,
  },
  params: {
    id: {
      field: 'companyChannelSettingId',
      type: 'number',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      companyChannel: {
        eager: false,
      },
    },
  },
  routes: {},
  dto,
  serialize,
})
@ApiTags('Channels')
@Controller('company-channel-settings')
@ApiBearerAuth('JWT-auth')
@Feature(RoleSubjects.CompanyChannel)
@UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
@CrudAuth({
  filter: () => ({
    isEnabled: true,
  }),
  persist: () => ({
    isEnabled: true,
  }),
})
@SetCurrentUser
export class OemCompanyChannelSettingsController
  implements CrudController<OemCompanyChannelSetting>
{
  constructor(public service: OemCompanyChannelSettingsService) {}
}
