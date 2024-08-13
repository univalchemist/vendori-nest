import { ExecutionContext, Injectable } from '@nestjs/common';
import {
  AbilityBuilder,
  createAliasResolver,
  createMongoAbility,
  MongoAbility,
  subject as an,
} from '@casl/ability';
import { getAction, getFeature } from '@nestjsx/crud';
import { Request } from 'express';
import { InjectDataSource } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RoleActions } from './types/role-actions.enum';
import { RoleSubjects } from './types/role-subjects.type';

import { OemUserEntity } from '../../oem/main/oem-users/oem-user.entity';
import { OemQuoteEntity } from '../../oem/main/oem-quotes/oem-quote.entity';
import { OemVendoEntity } from '../../oem/main/oem-vendos/oem-vendo.entity';

import { CreateAccessEnum } from '../../oem/main/oem-roles/oem-role.enums/create-access.enum';
import { DataAccessEnum } from '../../oem/main/oem-roles/oem-role.enums/data-access.enum';
import { RoleTypeEnum } from '../../oem/main/oem-roles/oem-role.enums/role-type.enum';
import { ToTypeEnum } from '../../oem/main/oem-quotes/oem-quote.enums/to.enum';
import { QuoteStatusEnum } from '../../oem/main/oem-quotes/oem-quote.enums/quote-status.enum';
import { VendoStatusEnum } from '../../oem/main/oem-vendos/oem-vendo.enums/vendo-status.enum';
import { permittedFieldsOf } from '@casl/ability/extra';

@Injectable()
export class RoleAbilityFactory {
  constructor(
    //TODO: we should avoid it use master connection, bc everything should be company scoped
    @InjectDataSource('MASTER_CONNECTION')
    private readonly connection: Connection,
  ) {}

  private _getRoleAction(context: ExecutionContext) {
    const handler = context.getHandler();
    return getAction(handler) as RoleActions;
  }

  private _getRoleSubject(context: ExecutionContext) {
    const controller = context.getClass();
    return getFeature(controller) as RoleSubjects;
  }

  private _defineDataAccess(
    abilityBuilder: AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>,
    dataAccess: DataAccessEnum,
  ) {
    // TODO: take into account for GET /quotes/:quoteId, GET /vendos/:vendoId, GET /recently-viewed-quotes-vendos
    switch (dataAccess) {
      case DataAccessEnum.ALL:
        break;
      case DataAccessEnum.TEAM_SUB_HIERARCHY:
        break;
      case DataAccessEnum.TEAM_ONLY:
        break;
      case DataAccessEnum.ASSIGNED_ONLY:
        break;
      default:
        break;
    }
  }

  private _defineRoleType(
    abilityBuilder: AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>,
    roleType: RoleTypeEnum,
    user,
  ) {
    const { can, cannot, rules } = abilityBuilder;
    // TODO: take into account for POST, PATCH, PUT & DELETE /workflow-rules and /vacation-rules
    switch (roleType) {
      case RoleTypeEnum.ADMIN:
        break;
      case RoleTypeEnum.QUOTE_CREATOR:
        this._defineDefaultEditAccess(abilityBuilder, user);
        can(RoleActions.Modify, [
          RoleSubjects.Quote,
          RoleSubjects.Vendo,
          RoleSubjects.QuoteApprovalQueue,
          RoleSubjects.VendoApprovalQueue,
        ]);
        break;
      case RoleTypeEnum.WORKFLOW_APPROVER:
        this._defineDefaultEditAccess(abilityBuilder, user);
        can(RoleActions.Modify, [
          RoleSubjects.WorkflowRule,
          RoleSubjects.VacationRule,
        ]);
        break;
      case RoleTypeEnum.CHANNEL_MANAGER:
        this._defineDefaultEditAccess(abilityBuilder, user);
        can(RoleActions.Modify, [RoleSubjects.CompanyChannel]);
        break;
      default:
        this._defineDefaultEditAccess(abilityBuilder, user);
        break;
    }
  }

  private _defineDefaultEditAccess(
    abilityBuilder: AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>,
    user,
  ) {
    const { can, cannot } = abilityBuilder;
    cannot(RoleActions.Modify, RoleSubjects.All);
    can(RoleActions.Modify, RoleSubjects.All, {
      ownerUserId: { $eq: user.userId },
    });
    can([RoleActions.UpdateOne, RoleActions.ReplaceOne], RoleSubjects.User, {
      userId: { $eq: user.userId },
    });
    cannot([RoleActions.UpdateOne, RoleActions.ReplaceOne], RoleSubjects.User, [
      'geoHierarchyId',
      'roleId',
      'password',
    ]).because('You are not allowed to edit sensitive values');
  }

  private _defineCreateAccess(
    abilityBuilder: AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>,
    createAccess: CreateAccessEnum,
    req: Request,
  ) {
    const { cannot } = abilityBuilder;

    switch (createAccess) {
      case CreateAccessEnum.ALL:
        break;
      case CreateAccessEnum.INTERNAL_CREATE:
        if (req?.query?.to === ToTypeEnum.EXTERNAL) {
          cannot(RoleActions.Submit, RoleSubjects.Quote);
          cannot(RoleActions.Submit, RoleSubjects.Vendo);
        }
        cannot(RoleActions.Modify, RoleSubjects.QuoteApprovalQueue);
        cannot(RoleActions.Modify, RoleSubjects.VendoApprovalQueue);
        break;
      case CreateAccessEnum.EDIT_APPROVE_ONLY:
        cannot(RoleActions.Create, RoleSubjects.Quote);
        cannot(RoleActions.Create, RoleSubjects.Vendo);
        cannot(RoleActions.Submit, RoleSubjects.Quote);
        cannot(RoleActions.Submit, RoleSubjects.Vendo);
        break;
      case CreateAccessEnum.VIEW_ONLY:
        cannot(RoleActions.Modify, RoleSubjects.Quote);
        cannot(RoleActions.Modify, RoleSubjects.Vendo);
        break;
      default:
        break;
    }
  }

  private async _defineDeleteAccess(
    abilityBuilder: AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>,
    context?: ExecutionContext,
  ) {
    if (!context) {
      return;
    }

    const { cannot } = abilityBuilder;
    const req = context?.switchToHttp().getRequest() as Request;
    const action = this._getRoleAction(context);
    const subject = this._getRoleSubject(context);

    if (action === RoleActions.DeleteOne && subject === RoleSubjects.Quote) {
      const quoteId = req.params.id;
      const quote = await this.connection.manager.findOne(
        OemQuoteEntity,
        quoteId,
      );
      if (quote.quoteStatus === QuoteStatusEnum.TRANSACTED) {
        cannot(action, subject);
      }
    } else if (
      action === RoleActions.DeleteOne &&
      subject === RoleSubjects.Vendo
    ) {
      const vendoId = req.params.id;
      const vendo = await this.connection.manager.findOne(
        OemVendoEntity,
        vendoId,
      );
      if (vendo.vendoStatus === VendoStatusEnum.TRANSACTED) {
        cannot(action, subject);
      }
    }
  }

  async createForUser(user: OemUserEntity, context?: ExecutionContext) {
    const abilityBuilder: AbilityBuilder<
      MongoAbility<[RoleActions, RoleSubjects]>
    > = new AbilityBuilder<MongoAbility<[RoleActions, RoleSubjects]>>(
      createMongoAbility,
    );

    const { can, build, rules } = abilityBuilder;

    if (user) {
      can(RoleActions.Manage, RoleSubjects.All); // read-write access to everything by default
    }

    // console.log('RoleAbilityFactory user', user);
    // https://bloodandtreasure.atlassian.net/browse/VEN-883
    if (user?.role) {
      // console.log('RoleAbilityFactory => user.role', user.role);
      const req = context?.switchToHttp().getRequest() as Request;

      //this._defineDataAccess(abilityBuilder, user.role.dataAccess);
      this._defineRoleType(abilityBuilder, user.role.roleType, user);
      this._defineCreateAccess(abilityBuilder, user.role.createAccess, req);
      await this._defineDeleteAccess(abilityBuilder, context);
    }

    const resolveAction = createAliasResolver({
      [RoleActions.Read]: [RoleActions.ReadOne, RoleActions.ReadAll],
      [RoleActions.Create]: [
        RoleActions.CreateOne,
        RoleActions.CreateMany,
        RoleActions.Clone,
        RoleActions.CloneBulk,
      ],
      [RoleActions.Modify]: [
        RoleActions.CreateOne,
        RoleActions.CreateMany,
        RoleActions.UpdateOne,
        RoleActions.ReplaceOne,
        RoleActions.DeleteOne,
        RoleActions.Submit,
        RoleActions.Clone,
        RoleActions.DeleteBulk,
      ],
    });

    return createMongoAbility(rules, {
      // detectSubjectType: (item: any) =>{ console.log(item.constructor as ExtractSubjectType<RoleSubjects>);
      //   return item.constructor as ExtractSubjectType<RoleSubjects>},
      resolveAction,
    });
    /*
        return build({
          // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
          detectSubjectType: (item: any) =>
            item.constructor as ExtractSubjectType<RoleSubjects>,
          resolveAction,
        });*/
  }

  async canActivate(context: ExecutionContext) {
    const { user, body, params } = context.switchToHttp().getRequest();

    if (!user) return false;

    const ability = await this.createForUser(user, context);

    const action = this._getRoleAction(context);
    const subject = this._getRoleSubject(context);

    const dtoKeys = Object.keys(body);

    // it gets by comparecing rules
    const nonUpdatetableFields = dtoKeys.filter(
      (i) =>
        permittedFieldsOf(ability, action, subject, {
          fieldsFrom: (rule) => {
            // this is a bit tricky here bc we have one rule by default
            // { action: 'manage', subject: 'all' },
            // and the second one
            //       {
            //         action: 'Modify',
            //         subject: 'subject',
            //         fields: [ ... your fields],
            //         inverted: true
            //       }
            return rule.fields || dtoKeys;
          },
        }).indexOf(i) == -1,
    );

    let can = ability.can(action, subject, nonUpdatetableFields[0]);

    /**
     *  it doesn't work like expected, I think it is due:
     *  if (user) {
     * can(RoleActions.Manage, RoleSubjects.All); // read-write access to everything by default
     * }
     * this is a huge mistake to allow everyone to edit any RESOURCES!
     * so in some reason reverted rules do not override 'can' rule
     * @update commented detectSubjectType, seems like it solves fields issue
     */

    if (subject == RoleSubjects.User) {
      can =
        can &&
        ability.can(action, an(subject, { ...body, userId: +params?.id }));
      console.log(
        ability.can(action, an(subject, { userId: +params?.id })),
        params,
      );
    } else {
      //we should get object and check ownerUserId, but for now we are ignoring it
      /*can = ability.can(
        action,
        an(subject, { ...body, ownerUserId: +user?.userId }),
      );*/
    }

    console.log(
      `RoleAbilityFactory => ${can ? 'Can' : 'Cannot'} ${action} ${subject}`,
      'updatableFields - ',
      nonUpdatetableFields,
    );

    return !!can;
  }
}
