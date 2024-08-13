import { Global, Module } from '@nestjs/common';

import { RoleAbilityFactory } from './role-ability.factory';
import { RolesGuard } from './guards/roles.guard';

@Global()
@Module({
  providers: [RoleAbilityFactory, RolesGuard],
  exports: [RoleAbilityFactory],
})
export class ACLModule {}
