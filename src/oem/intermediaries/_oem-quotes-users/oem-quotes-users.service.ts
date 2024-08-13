import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  Connection,
  EntityManager,
  In,
  Not,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

import { OemQuotesUsers } from './oem-quotes-users.entity';
import { OemQuotesUsersCreateDto } from './oem-quotes-users.dto/oem-quotes-users.create.dto';
import { OemQuotesUsersUpdateDto } from './oem-quotes-users.dto/oem-quotes-users.update.dto';
import { OemQuotesUsersReplaceDto } from './oem-quotes-users.dto/oem-quotes-users.replace.dto';
import { OemQuoteApprovalQueuesService } from '../_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queues.service';
import { OemQuoteApprovalQueue } from '../_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.entity';
import { OemUserEntity } from '../../main/oem-users/oem-user.entity';
import { OemQuoteEntity, Quote } from '../../main/oem-quotes/oem-quote.entity';
import { ActionLogs } from '../../main/oem-action-logs/oem-action-logs.decorators/action-logs.decorator';
import { ActionLogTypeEnum } from '../../main/oem-action-logs/oem-action-log.enums/action-log-types.enum';
import { ActionsEnum } from '../../main/oem-action-logs/oem-action-log.enums/actions.enum';
import { QuoteApprovalQueueTargetTypeEnum } from '../_oem-approval-queues/_oem-quote-approval-queues/oem-quote-approval-queue.enums/quote-approval-queue-target-type.enum';
import { QuoteStatusEnum } from '../../main/oem-quotes/oem-quote.enums/quote-status.enum';
import { OemQuotesUsersDto } from './oem-quotes-users.dto/oem-quotes-users.dto';
import { RoleAbilityFactory } from '../../../auth/roles/role-ability.factory';
import { RoleActions } from '../../../auth/roles/types/role-actions.enum';
import { RoleSubjects } from '../../../auth/roles/types/role-subjects.type';
import { CommonDefaultMethodExtension } from '../../../common/decorators/common-default-method-extention.decorator';
import { ApplyVacationRule } from '../../main/oem-rules/oem-vacation-rules/oem-vacation-rules.decorators/vacation-rule.decorator';
import { ISalesforceMetaData } from '../../../shared/salesforce/salesforce.types/salesforce.sf_metadata.type';
import { QuoteUserTypeEnum } from './oem-quotes-users.enums/quoteUserTypeEnum';
import { OemRoleEntity } from '../../main/oem-roles/oem-role.entity';

@Injectable()
@CommonDefaultMethodExtension
export class OemQuotesUsersService extends TypeOrmCrudService<OemQuotesUsers> {
  constructor(
    private connection: Connection,
    @InjectRepository(OemQuotesUsers) public repo: Repository<OemQuotesUsers>,
    @InjectRepository(OemUserEntity)
    private userRepo: Repository<OemUserEntity>,
    @InjectRepository(OemRoleEntity)
    private userRoleRepo: Repository<OemRoleEntity>,
    @Inject(OemQuoteApprovalQueuesService)
    private quoteApprovalQueuesService: OemQuoteApprovalQueuesService,
    private roleAbilityFactory: RoleAbilityFactory,
  ) {
    super(repo);
  }

  async getOne(req: CrudRequest) {
    return super.getOne(req);
  }

  private async _create(
    req: CrudRequest,
    dto: Partial<OemQuotesUsersCreateDto>,
    manager: EntityManager,
  ) {
    const userId = req.parsed.paramsFilter.find(
      (params) => params.field === req.options.params.userId.field,
    ).value;
    const user = await manager.findOne(OemUserEntity, userId);
    if (!user) throw new NotFoundException('That user is not found');

    const quote = await manager.findOne(OemQuoteEntity, dto.quoteId);
    if (!quote) throw new NotFoundException('Quote not found');

    if (quote.quoteStatus === QuoteStatusEnum.EXPIRED)
      throw new BadRequestException(
        'The quote is expired and cannot be updated',
      );

    const quoteUser = await manager.save(
      this.repo.create({
        ...dto,
        userId,
        companyId: req['user']['companyId'],
      }),
    );

    // Disable other approvers if we are setting to current one
    if (dto.isApprover === true)
      await manager.update(
        OemQuotesUsers,
        {
          quoteId: dto.quoteId,
          userId: Not(userId),
          isEnabled: true,
        },
        {
          isApprover: false,
        },
      );

    // UpdateApprovalQueue only if quote isn't DRAFT
    if (quote.quoteStatus !== QuoteStatusEnum.DRAFT)
      return this.updateApprovalQueue(req, dto, quoteUser, manager);

    return quoteUser;
  }

  async createOne(
    req: CrudRequest,
    dto: Partial<OemQuotesUsersCreateDto>,
  ): Promise<OemQuotesUsers> {
    return this.connection.transaction(async (manager) =>
      this._create(req, dto, manager),
    );
  }

  async updateApprovalQueue(
    req: any,
    dto: Partial<OemQuotesUsersDto>,
    updatedQuoteUser: OemQuotesUsers,
    manager: EntityManager,
  ) {
    // If we set isApprover to true, then we need update other quoteUsers to be set to isApprover to false
    const quoteId = updatedQuoteUser.quoteId;
    const userId = updatedQuoteUser.userId;

    /*
      // This one only for customer and external users, that means eApprover
      if (
        quoteUser.isApprover === dto.isApprover ||
        dto.isApprover === undefined
      ) {
        return updatedQuoteUser;
      }
    */

    // If we do not change isApprover, then we do not update quoteApprovalQueues

    // Deactivate other queues with targetType = 'customer'
    if (dto.isApprover === true) {
      await manager.update(
        OemQuoteApprovalQueue,
        {
          quoteId: quoteId,
          isEnabled: true,
          isActive: true,
          targetType: QuoteApprovalQueueTargetTypeEnum.CUSTOMER,
        },
        {
          isActive: false,
        },
      );
    }

    const user = await manager.findOne(OemUserEntity, userId);
    const ability = await this.roleAbilityFactory.createForUser(user);
    if (ability.cannot(RoleActions.Modify, RoleSubjects.QuoteApprovalQueue))
      return updatedQuoteUser;

    const quoteApprovalQueue = await manager.findOne(OemQuoteApprovalQueue, {
      where: {
        quoteId: updatedQuoteUser.quoteId,
        userId: updatedQuoteUser.userId,
      },
    });

    if (!quoteApprovalQueue)
      await this.quoteApprovalQueuesService.create(
        {
          userId: userId,
          quoteId: quoteId,
          companyId: updatedQuoteUser.companyId,
          targetType:
            updatedQuoteUser.isApprover === true
              ? QuoteApprovalQueueTargetTypeEnum.CUSTOMER
              : QuoteApprovalQueueTargetTypeEnum.EXTERNAL,
        },
        manager,
      );
    else
      await manager.update(
        OemQuoteApprovalQueue,
        {
          quoteApprovalQueueId: quoteApprovalQueue.quoteApprovalQueueId,
        },
        {
          isActive: true,
          targetType:
            updatedQuoteUser.isApprover === true
              ? QuoteApprovalQueueTargetTypeEnum.CUSTOMER
              : QuoteApprovalQueueTargetTypeEnum.EXTERNAL,
        },
      );

    return updatedQuoteUser;
  }

  async update(
    req,
    quoteId: number,
    userId: number,
    dto: Partial<OemQuotesUsersUpdateDto>,
    manager: EntityManager,
  ) {
    const quoteUser = await this.repo.findOne({
      where: {
        quoteId,
        userId,
      },
      relations: ['quote'],
    });

    await this.integrateQuoteUserContactSF(
      req,
      { opportunityId: quoteUser.quote.opportunityId, quoteId, userId },
      dto,
    );

    if (!quoteUser) {
      throw new NotFoundException('Quote user not found');
    }

    if (quoteUser.quote.quoteStatus === QuoteStatusEnum.EXPIRED)
      throw new BadRequestException('Quote expired');

    if (quoteUser.isApprover !== false && dto.isApprover === false) {
      throw new BadRequestException(
        'You cannot set isApprover to false, please choose another quote user and set him to isApprover, the current would be disabled',
      );
    }
    //disable other approvers if we are setting to current one
    if (dto.isApprover === true)
      await manager.update(
        OemQuotesUsers,
        {
          quoteId: quoteId,
          userId: Not(userId),
          isEnabled: true,
        },
        {
          isApprover: false,
        },
      );

    const updatedQuoteUser = await manager.save(
      this.repo.create({
        ...quoteUser,
        ...dto,
        companyId: req.user.companyId,
      }),
    );
    //update approval queue only if quote isn't draft
    if (quoteUser.quote.quoteStatus !== QuoteStatusEnum.DRAFT) {
      return this.updateApprovalQueue(req, dto, updatedQuoteUser, manager);
    } else return updatedQuoteUser;
  }

  @ActionLogs(ActionLogTypeEnum.QUOTE, ActionsEnum.DETACH)
  async deleteOne(req: CrudRequest) {
    return this.connection.transaction(async (manager) => {
      const quoteId = req.parsed.paramsFilter.find(
        (params) => params.field === req.options.params.id.field,
      );

      const userId = req.parsed.paramsFilter.find(
        (params) => params.field === req.options.params.userId.field,
      );

      await manager.update(
        OemQuoteApprovalQueue,
        {
          quoteId: quoteId,
          userId: userId,
          isEnabled: true,
          isActive: true,
        },
        {
          isActive: false,
          isEnabled: false,
        },
      );
      return super.deleteOne(req);
    });
  }

  @ActionLogs(ActionLogTypeEnum.QUOTE, ActionsEnum.ATTACH)
  async updateOne(req: CrudRequest, dto: any): Promise<OemQuotesUsers> {
    return this.connection.transaction(async (manager) => {
      const quoteId = req.parsed.paramsFilter.find(
        (params) => params.field === req.options.params.id.field,
      );
      const userId =
        req.parsed.paramsFilter.find(
          (params) => params.field === req.options.params.userId.field,
        ) || dto.userId;

      return this.update(req, quoteId.value, userId.value, dto, manager);
    });
  }

  @ApplyVacationRule()
  @ActionLogs(ActionLogTypeEnum.QUOTE, ActionsEnum.ATTACH)
  async replaceOne(
    req: CrudRequest,
    dto: Partial<OemQuotesUsersReplaceDto>,
  ): Promise<OemQuotesUsers> {
    return this.connection.transaction(async (manager) => {
      const quoteId = req.parsed.paramsFilter.find(
        (params) => params.field === req.options.params.id.field,
      );
      const userId = req.parsed.paramsFilter.find(
        (params) => params.field === req.options.params.userId.field,
      );

      const quoteUser = await this.repo.findOne({
        where: {
          quoteId: quoteId.value,
          userId: userId.value,
        },
      });

      if (quoteUser) {
        return this.update(req, quoteId.value, userId.value, dto, manager);
      } else {
        return this._create(req, dto, manager);
      }
    });
  }

  // TODO: Move to @salesforce
  async integrateQuoteContactSF(
    req: any,
    quote: Partial<OemQuoteEntity>,
    sfObject?: ISalesforceMetaData,
  ): Promise<any> {
    try {
      const { companyId } = req.user;

      if (sfObject && sfObject?.contacts.length > 0) {
        const contacts = sfObject.contacts;

        const users = await this.userRepo.find({
          where: [
            {
              notificationEmail: In(contacts.flatMap((c) => c.email)),
              isExternal: true,
            },
            {
              ssoLoginEmail: In(contacts.flatMap((c) => c.email)),
              isExternal: true,
            },
          ],
        });

        // console.log(
        //   'integrateQuoteContactSF',
        //   users,
        //   contacts.flatMap((c) => c.email),
        // );

        for (const contact of contacts) {
          let user = users.filter(
            (u) =>
              u.notificationEmail === contact.email ||
              u.ssoLoginEmail === contact.email,
          )[0];

          const userAttributes = {
            roleId: (
              await this.userRoleRepo.findOne({ isEnabled: true, priority: 2 })
            ).roleId,
            geoHierarchyId: quote.geoHierarchyId,
            sfContactId: contact.sfContactId,
            organizationId: sfObject.account?.AccountId,
            companyOrganisationName: contact.companyOrganisationName || '-',
            region: 'N/A',
            timeZoneArea: 'US/Pacific',
            imageUrl: 'https://demo.vendori.com/images/default-user-image.png',
            firstName: contact.firstName,
            lastName: contact.lastName,
            notificationEmail: contact.email,
            ssoLoginEmail: contact.email,
            phone: contact.phone,
            isExternal: true,
            isActive: true,
            isHideWelcomeText: true,
          };

          if (!user)
            user = await this.userRepo.save(
              this.userRepo.create(userAttributes),
            );
          else await this.userRepo.update(user.userId, userAttributes);

          const quoteUser = await this.repo.findOne({
            where: {
              userId: user.userId,
              quoteId: quote.quoteId,
              isEnabled: true,
            },
          });

          const quoteUserAttributes = {
            companyId,
            sfOpportunityContactRoleId: contact.sfOpportunityContactRoleId,
            userId: user.userId,
            quoteId: quote.quoteId,
            type: QuoteUserTypeEnum.END_CUSTOMER,
            isApprover: contact.type === 'Quote Signer' || !!contact.isApprover,
            showOnPDF: true,
            sendNotification: true,
          };

          if (quoteUser) await this.repo.update(quoteUser, quoteUserAttributes);
          else
            await this.repo.save(this.repo.create(quoteUserAttributes), {
              transaction: true,
            });
        }
      }
    } catch (error) {
      console.error('integrateQuoteContactSF', error);
    }
  }

  async integrateQuoteUserContactSF(
    req: any,
    quoteInfo: any,
    dto: Partial<OemQuotesUsersUpdateDto | OemQuotesUsersReplaceDto | any>,
  ): Promise<any> {
    try {
      const { companyId } = req.user;

      // // TODO: We should check decorators / passed information from multiple methods
      // if (dto.quoteId.length) {
      //   dto.userId = dto.quoteId[0].userId;
      //   dto.quoteId = dto.quoteId[0].quoteId;
      // }

      const opportunityQuoteUsers = await this.repo
        .createQueryBuilder('quotesUsers')
        .leftJoinAndSelect('quotesUsers.quote', 'quote')
        .where(`quote.opportunityId = :opportunityId`, {
          opportunityId: quoteInfo.opportunityId,
        })
        .execute();

      const quoteUsersForOpportunities = await this.repo.find({
        where: {
          // TODO: Fix silly code here
          quoteId: In(opportunityQuoteUsers.map((q) => q['quote_quote_id'])),
          isEnabled: true,
        },
      });

      const currentQuoteUser = quoteUsersForOpportunities.filter(
        (qu) =>
          qu.userId !== quoteInfo.userId || qu.quoteId !== quoteInfo.quoteId,
      )[0];

      const quoteUserAttributes = {
        companyId,
        userId: quoteInfo.userId,
        quoteId: quoteInfo.quoteId,
        type: dto.type,
        isApprover: dto.isApprover,
        isOwner: dto.isOwner,
        showOnPDF: true,
        sendNotification: true,
      };

      if (currentQuoteUser?.userId === quoteInfo.userId)
        await this.repo.update(currentQuoteUser, quoteUserAttributes);

      const quotesWithoutTheUser = quoteUsersForOpportunities
        .filter((q) => q.quoteId !== quoteInfo.quoteId)
        .filter((q) => q.userId !== quoteInfo.userId);

      for (const quote of quotesWithoutTheUser) {
        quoteUserAttributes.quoteId = quote.quoteId;

        await this.repo.save(this.repo.create(quoteUserAttributes), {
          transaction: false,
        });
      }
    } catch (error) {
      console.error('integrateQuoteContactSF', error);
    }
  }
}
