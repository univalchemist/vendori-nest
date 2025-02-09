import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { Action, Crud, CrudAuth, CrudController, Feature } from '@nestjsx/crud';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';

import { OemRoleEntity } from './oem-role.entity';
import { OemRolesService } from './oem-roles.service';
import { dto, serialize } from './oem-role.dto';
import { SessionAuthGuard } from '../../../auth/guards/session-auth.guard';
import { JWTAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { SetCurrentUser } from '../oem-users/oem-users.decorators/set-current-user.decorator';
import { RoleSubjects } from '../../../auth/roles/types/role-subjects.type';
import { RolesGuard } from '../../../auth/roles/guards/roles.guard';
import { RoleActions } from '../../../auth/roles/types/role-actions.enum';

@Crud({
  model: {
    type: OemRoleEntity,
  },
  params: {
    id: {
      field: 'roleId',
      type: 'number',
      primary: true,
    },
  },
  query: {
    alwaysPaginate: true,
    join: {
      company: {
        eager: false,
      },
    },
  },
  routes: {
    exclude: ['createManyBase'],
  },
  dto,
  serialize,
})
@ApiTags('Users')
@Controller('user-roles')
@ApiBearerAuth('JWT-auth')
@Feature(RoleSubjects.Role)
@UseGuards(SessionAuthGuard, JWTAuthGuard, RolesGuard)
@CrudAuth({
  filter: (req) => ({
    companyId: req.user.companyId,
    isEnabled: true,
  }),
  persist: (req) => ({
    companyId: req.user.companyId,
    isEnabled: true,
  }),
})
@SetCurrentUser
export class OemRolesController implements CrudController<OemRoleEntity> {
  constructor(public service: OemRolesService) {}

  get base(): CrudController<OemRoleEntity> {
    return this;
  }

  @ApiOkResponse({
    description: 'The priority swap',
  })
  @ApiOperation({
    summary:
      'Exchange priority between user roles. If user role with a such priority was not found - will just replace the current one',
  })
  @Patch(`/:id/priority`)
  @ApiParam({
    name: 'id',
    description: 'Role Id',
    allowEmptyValue: false,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        priority: { type: 'number' },
      },
    },
  })
  @Action(RoleActions.Modify)
  async replacePriority(@Param() params, @Body() body) {
    return await this.service.replacePriority({
      id: params.id,
      priority: body.priority,
    });
  }
}
