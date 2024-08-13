import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OemVacationRule } from '../oem-vacation-rule.entity';

export function ApplyVacationRule() {
  const injectVacationRuleRepo = InjectRepository(OemVacationRule);

  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectVacationRuleRepo(target, 'repoVacationRule');
    // InjectRepository(OemVacationRule)(target, 'repoVacationRule');

    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]) {
      try {
        const repoVacationRule: Repository<OemVacationRule> =
          this.repoVacationRule;

        const indexUserIdField = args[0].parsed.paramsFilter.findIndex(
          (params) => params.field === args[0].options.params.userId.field,
        );

        const vacationRule = await repoVacationRule.findOne({
          where: {
            sourceUserId: args[0].parsed.paramsFilter[indexUserIdField].value,
            isActive: true,
          },
          relations: ['targetUser'],
        });

        // we should override CRUD parsed params to make method supported
        const userId =
          vacationRule?.targetUserId ||
          args[0].parsed.paramsFilter[indexUserIdField].value;
        args[0].parsed.paramsFilter[indexUserIdField].value = userId;

        return await originalMethod.apply(this, args);
      } catch (error) {
        throw error;
      }
    };
  };
}
