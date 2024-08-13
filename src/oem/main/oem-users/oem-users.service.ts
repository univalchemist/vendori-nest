import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CrudRequest } from '@nestjsx/crud';

import { OemUserEntity } from './oem-user.entity';
import { OemQuoteEntity } from '../oem-quotes/oem-quote.entity';

import { SetCurrentTenant } from '../../../common/decorators/set-current-tenant.decorator';

import { OemQuotesUsers } from '../../intermediaries/_oem-quotes-users/oem-quotes-users.entity';
import { OemQuoteApprovalQueue } from '../../intermediaries/_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.entity';
import { OemVendoEntity } from '../oem-vendos/oem-vendo.entity';
import { OemVendosUsers } from '../../intermediaries/_oem-vendos-users/oem-vendos-users.entity';
import { OemVendoApprovalQueue } from '../../intermediaries/_oem-approval-queues/_oem-vendo-approval-queues/oem-vendo-approval-queue.entity';

import { OemUserReplaceDto } from './oem-user.dto/oem-user.replace.dto';
import { OemUserDeleteDto } from './oem-user.dto/oem-user.delete.dto';
import { OemUserRoleReassignDto } from './oem-user.dto/oem-user.role-reassign.dto';
import { RoleTypeEnum } from '../oem-roles/oem-role.enums/role-type.enum';
import { Repository } from 'typeorm';
import { OemUserCreateDto } from './oem-user.dto/oem-user.create.dto';

@Injectable()
@SetCurrentTenant
export class OemUsersService extends TypeOrmCrudService<OemUserEntity> {
  constructor(
    @InjectRepository(OemUserEntity) public repo: Repository<OemUserEntity>,
  ) {
    super(repo);
  }

  async createOne(
    req: CrudRequest,
    dto: Partial<OemUserCreateDto>,
  ): Promise<OemUserEntity> {
    if (dto.sfUserId) return await this.integrateUserSF(dto);

    let user: OemUserEntity = await this.repo.findOne({
      ssoLoginEmail: dto.ssoLoginEmail,
      isEnabled: false,
      isExternal: false,
    });

    if (user) {
      user = await this.repo.save(
        this.repo.create({ ...user, isEnabled: true }),
      );

      return user;
    }

    return super.createOne(req, dto);
  }

  // public async register(data: Partial<OemUserEntity>): Promise<OemUserEntity> {
  //   let user: OemUserEntity = await this.repo.findOne({
  //     ssoLoginEmail: data.ssoLoginEmail,
  //     isEnabled: false,
  //   });
  //   if (user) {
  //     user = await this.repo.save(
  //       this.repo.create({ ...user, ...data, isEnabled: true }),
  //     );
  //   } else {
  //     user = await this.repo.save(
  //       this.repo.create({ ...user, ...data, isEnabled: true }),
  //     );
  //   }
  //   return user;
  // }

  async replaceOne(
    req: CrudRequest,
    dto: Partial<OemUserReplaceDto>,
  ): Promise<OemUserEntity> {
    if (dto.sfUserId) return await this.integrateUserSF(dto);

    const userId = req.parsed.paramsFilter.find(
      (params) => params.field === req.options.params.id.field,
    );

    const user = await this.repo.findOne(userId.value);

    if (user) {
      const replacedUser = await this.repo.save(
        this.repo.create({
          ...user,
          ...dto,
        }),
      );

      return this.repo.findOne(replacedUser.userId, {
        relations: ['geoHierarchy'],
      });
    }

    return super.replaceOne(req, dto);
  }

  async updateOne(
    req: CrudRequest,
    dto?: Partial<OemUserReplaceDto>,
  ): Promise<OemUserEntity> {
    if (dto.sfUserId) return await this.integrateUserSF(dto);

    const userId = req.parsed.paramsFilter.find(
      (params) => params.field === req.options.params.id.field,
    );

    const user = await this.repo.findOne(userId.value);

    if (user) {
      const replacedUser = await this.repo.save(
        this.repo.create({
          ...user,
          ...dto,
        }),
      );

      return this.repo.findOne(replacedUser.userId, {
        relations: ['geoHierarchy'],
      });
    }

    return super.updateOne(req, dto);
  }

  /** Moved to deleteOne
   * @deprecated
   */
  /* //TODO(minor): validation should be moved to DTO
   //TODO(refactor): we can get our own relation in meta - it's a bit wrong to hardcode it
   async reassign(params: { id: number; targetUserId: number }) {
     const { id, targetUserId } = params;
     const sourceUser = await this.repo.findOne(id, {
       relations: [
         'quotes',
         'usersQuotes',
         'quoteApprovalQueues',
         'vendos',
         'vendosUsers',
         'vendoApprovalQueues',
       ],
     });

     if (!sourceUser) {
       throw new NotFoundException('Source user not found');
     }

     const targetUser = await this.repo.findOne(targetUserId);
     if (!targetUser) {
       throw new NotFoundException('Target user not found');
     }

     await this.repo.manager.transaction(async (manager) => {
       // reassign all quotes to the target user
       for (const quote of sourceUser.quotes) {
         await manager.update(
           OemQuoteEntity,
           {
             quoteId: quote.quoteId,
             isEnabled: true,
           },
           {
             ownerUserId: targetUserId,
           },
         );
       }

       for (const quoteUser of sourceUser.usersQuotes) {
         await manager.update(
           OemQuotesUsers,
           {
             quoteId: quoteUser.quoteId,
             userId: quoteUser.userId,
             isEnabled: true,
           },
           {
             userId: targetUserId,
           },
         );
       }

       for (const quoteApprovalQueue of sourceUser.quoteApprovalQueues) {
         await manager.update(
           OemQuoteApprovalQueue,
           {
             quoteApprovalQueueId: quoteApprovalQueue.quoteApprovalQueueId,
             isEnabled: true,
             isActive: true,
           },
           {
             userId: targetUserId,
           },
         );
       }

       // reassign all vendos to the target user
       for (const vendo of sourceUser.vendos) {
         await manager.update(
           OemVendoEntity,
           {
             vendoId: vendo.vendoId,
             isEnabled: true,
           },
           {
             ownerUserId: targetUserId,
           },
         );
       }

       for (const vendoUser of sourceUser.vendosUsers) {
         await manager.update(
           OemVendosUsers,
           {
             vendoId: vendoUser.vendoId,
             userId: vendoUser.userId,
             isEnabled: true,
           },
           {
             userId: targetUserId,
           },
         );
       }

       for (const vendoApprovalQueue of sourceUser.vendoApprovalQueues) {
         await manager.update(
           OemVendoApprovalQueue,
           {
             vendoApprovalQueueId: vendoApprovalQueue.vendoApprovalQueueId,
             isEnabled: true,
             isActive: true,
           },
           {
             userId: targetUserId,
           },
         );
       }

       // deactivate the source user
       await manager.update(
         OemUserEntity,
         {
           userId: id,
         },
         {
           isActive: false,
           isEnabled: false,
         },
       );
     });

     return targetUser;
   }*/

  //TODO: we might have creatingUser and ownerUser for different contexts
  async deleteOne(
    req: CrudRequest,
    dto?: OemUserDeleteDto,
  ): Promise<void | OemUserEntity> {
    return this.repo.manager.connection.transaction(async (manager) => {
      const replaceUserId = dto.replaceUserId;
      const relations = this.repo.metadata.ownRelations.map(
        (relation) => relation.inverseEntityMetadata,
      );
      // req.params we put manually of parsed is not found
      const userId =
        (req &&
          req.parsed &&
          req.parsed.paramsFilter &&
          req.parsed.paramsFilter.find(
            (params) => params.field === req.options.params.id.field,
          ).value) ||
        req['params']['id'];

      const joinRelations = this.repo.metadata.ownRelations
        .map((relation) => {
          const relationFields = Object.keys(
            relation.inverseEntityMetadata.propertiesMap,
          ).filter((item) => ['userId', 'ownerUserId'].includes(item));
          if (relationFields.length > 0) {
            return relation.propertyName;
          }
        })
        .filter((item) => item != null);

      const user = await this.repo.findOne({
        where: {
          userId: userId,
        },
        relations: [...joinRelations],
      });

      const hasExistingRelations =
        joinRelations.filter(
          (joinRelation) =>
            (user[joinRelation] &&
              Array.isArray(user[joinRelation]) &&
              user[joinRelation].length > 0) ||
            (user[joinRelation] && !Array.isArray(user[joinRelation])),
        ).length != 0;

      if (hasExistingRelations && replaceUserId == null) {
        //todo: should be moved to controller
        throw new HttpException(
          'User has existing relations. Please provide correct replaceUserId',
          422,
        );
      }

      //disable current user
      await this.repo.update(
        {
          userId: userId,
          isEnabled: true,
        },
        {
          isEnabled: false,
        },
      );

      if (replaceUserId == null) {
        return user;
      }

      for (const relation of relations) {
        //update only ownerUserId and userId
        const updatedFields = Object.keys(relation.propertiesMap).filter(
          (item) => ['userId', 'ownerUserId'].includes(item),
        );

        /*SET FOREIGN_KEY_CHECKS=0;
        SET;FOREIGN_KEY_CHECKS = 1 */
        for (const updatedField of updatedFields) {
          const repo = await manager.getRepository(relation.targetName);

          //this is a danger zone, so we set LOCAL
          await repo.query(`SET LOCAL session_replication_role = 'replica';`);

          await manager.update(
            relation.targetName,
            {
              [updatedField]: userId,
            },
            {
              [updatedField]: replaceUserId,
            },
          );

          //this is a danger zone, so we disable LOCALly
          await repo.query(`SET LOCAL session_replication_role = 'origin';`);
        }
      }
      return user;
    });
  }

  /**
   * Checks if request owner is not admin, then throws error.
   * Re-assigns all users roles from given `sourceRoleId` to `targetRoleId`.
   */
  async bulkReassignRoles(
    req: CrudRequest & { user: OemUserEntity },
    body: OemUserRoleReassignDto,
  ) {
    const isAdmin = req.user.role.roleType == RoleTypeEnum.ADMIN;
    const { sourceRoleId, targetRoleId } = body;

    if (!isAdmin) {
      throw new BadRequestException('Access restricted for current user.');
    }

    return this.repo.update(
      {
        roleId: sourceRoleId,
      },
      {
        roleId: targetRoleId,
      },
    );
  }

  // TODO: Move to @salesforce
  async integrateUserSF(
    dto: Partial<OemUserCreateDto>,
  ): Promise<OemUserEntity> {
    // {
    //   "isActive": true,
    //   "isHideWelcomeText": false,
    //   "timeZoneArea": "US/Pacific",
    //   "region": "N/A",
    //   "ssoLoginEmail": "testing@dev1.com",
    //   "imageUrl": "https://google.com",
    //   "organizationId": "2",
    //   "companyOrganisationName": "Acme 02",
    //   "geoHierarchyId": 1,
    //   "roleId": 3,
    //   "phone": "1234567890",
    //   "sfUserId": "003DN000002m0XpYAI",
    //   "isExternal": true,
    //   "lastName": "Harrison",
    //   "firstName": null,
    //   "notificationEmail": "testing@dev1.com"
    // }

    dto.region = 'N/A';
    dto.timeZoneArea = 'US/Pacific';
    dto.imageUrl = 'https://demo.vendori.com/images/default-user-image.png';
    dto.firstName =
      !dto.firstName || dto.firstName === 'null' ? '-' : dto.firstName;
    dto.lastName =
      !dto.lastName || dto.lastName === 'null' ? '-' : dto.lastName;
    dto.notificationEmail = dto.notificationEmail;
    dto.ssoLoginEmail = dto.ssoLoginEmail;
    dto.phone = (dto.phone || '000-000-0000').replace(/[^0-9\-]/g, '');

    let newUser: OemUserEntity;
    const existingUser = await this.repo.findOne({
      ssoLoginEmail: dto.ssoLoginEmail,
      isExternal: true,
    });

    console.log('integrateUserSF', dto);

    if (existingUser) await this.repo.update(existingUser.userId, dto);
    else newUser = await this.repo.save(this.repo.create(dto));

    return newUser || existingUser;
  }
}
