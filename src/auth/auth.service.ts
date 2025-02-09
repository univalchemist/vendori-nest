import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Issuer } from 'openid-client';

import { OemUserEntity, User } from '../oem/main/oem-users/oem-user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { OemUsersService } from '../oem/main/oem-users/oem-users.service';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { OemHierarchiesService } from '../oem/main/oem-hierarchies/oem-hierarchies.service';
import { OktaUserinfo } from './interfaces/okta-userinfo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { OemCompanyEntity } from '../oem/main/oem-companies/oem-company.entity';
import { getConnection, ILike, Repository, SelectQueryBuilder } from 'typeorm';
import { EmailDynamicTemplate, EmailMessage } from '../shared/email/email.type';
import {
  APP_ROOT_URL,
  MAIL_USER_INVITE_TEMPLATE_ID,
  NODE_ENV,
  VENDORI_COMPANY_ADDRESS,
  VENDORI_LOGO_URL,
  VENDORI_SUPPORT_EMAIL,
} from '../environments';
import { sendGridEmailWithDynamicTemplate } from '../shared/email';
import { SetCurrentTenant } from '../common/decorators/set-current-tenant.decorator';
import { TenantsService } from '../shared/tenants/tenants.service';
// import { InjectConnection } from '@nestjs/typeorm';
import { EventDispatcher } from '../common/decorators/event-dispatcher.decorator';
import { EventsEnum } from '../shared/event-handler/event.enum/events.enum';

//TODO: seems like a it requires a little refactoring
@Injectable()
//@SetCurrentTenant
export class AuthService {
  private oktaVerifier: OktaJwtVerifier;
  private audience: string;

  constructor(
    @InjectRepository(OemCompanyEntity)
    private readonly company: Repository<OemCompanyEntity>,
    @Inject(OemUsersService)
    private readonly userService: OemUsersService,
    @Inject(OemHierarchiesService)
    private readonly hierarchyService: OemHierarchiesService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(TenantsService)
    private readonly tenantsService: TenantsService,
  ) {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: process.env.OKTA_ISSUER,
      clientId: process.env.OKTA_CLIENTID,
    });

    this.audience = process.env.OKTA_AUDIENCE;
  }

  async getMyAccounts(user: OemUserEntity): Promise<Array<OemCompanyEntity>> {
    return this.company.find({
      join: { alias: 'companies', innerJoin: { accounts: 'companies.users' } },
      where: (qb) => {
        qb.where({
          isEnabled: true,
        }).andWhere('accounts.ssoLoginEmail = :ssoLoginEmail', {
          ssoLoginEmail: user.ssoLoginEmail,
        }); // Filter related field
      },
    });
  }

  async getUserForCompany(
    user: OemUserEntity,
    companySubdomain: string,
  ): Promise<OemUserEntity> {
    return await this.userService.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.company', 'company')
      .leftJoinAndSelect('user.role', 'role')
      .where((qb: SelectQueryBuilder<OemUserEntity>) => {
        qb.where({
          isEnabled: true,
          isActive: true,
          isExternal: false,
        }).andWhere(
          'company.subdomain = :companySubdomain AND (LOWER(user.ssoLoginEmail) = :username OR LOWER(user.notificationEmail) = :username)',
          {
            username: user.ssoLoginEmail,
            companySubdomain,
          },
        );
      })
      .getOne();
  }

  async oktaValidateToken(token: string): Promise<any> {
    let user: OemUserEntity;
    try {
      const jwt = await this.oktaVerifier.verifyAccessToken(
        token,
        this.audience,
      );
      const email: string = jwt.claims.sub;

      user = await this.userService.findOne({
        where: {
          ssoLoginEmail: email,
          isEnabled: true,
          isExternal: false,
          isActive: true,
        },
        relations: ['role'],
      });
      if (!user) {
        throw new UnauthorizedException(
          `There isn't any user with email: ${email}`,
        );
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(
        `The token is invalid or user with provided email doesn't exist`,
      );
    }
  }

  // // Password is not needed at this time since Vendori is a passwordless service
  // async register(signUp: Partial<OemUserEntity>): Promise<User> {
  //   const user = await this.userService.register(signUp);
  //   // delete user.password;

  //   return user;
  // }

  // async login(email: string, password: string): Promise<OemUserEntity> {
  //   let user: OemUserEntity;
  //   try {
  //     user = await this.userService.findOne({
  //       where: { ssoLoginEmail: email, isEnabled: true, isActive: true },
  //     });
  //   } catch (err) {
  //     throw new UnauthorizedException(
  //       `There isn't any user with email: ${email}`,
  //     );
  //   }
  //   // console.log(await user.checkPassword(password));
  //   if (!user) {
  //     throw new UnauthorizedException(
  //       `There isn't any user with email: ${email}`,
  //     );
  //   }
  //
  //   if (!(await user.checkPassword(password))) {
  //     throw new UnauthorizedException(
  //       `Wrong password for user with email: ${email}`,
  //     );
  //   }
  //   delete user.password;
  //
  //   return user;
  // }

  // private async _registerNewUser(
  //   payload: OktaUserinfo,
  // ): Promise<OemUserEntity> {
  //   const domain = payload.preferred_username
  //     .split('@')
  //     .pop()
  //     .split('.')
  //     .shift()
  //     .replace(/[^a-z0-9]/g, '')
  //     .toLowerCase();

  //   /**
  //    * 4.09.22 I rewrote it bc - it seems like we would have a sql injection
  //    */
  //   const company = await this.company
  //     .createQueryBuilder()
  //     .where({ isEnabled: true })
  //     .andWhere(
  //       'LOWER( "Company".subdomain ) ILIKE :domain OR "Company".email_domain ILIKE :domain',
  //       { domain: `%${domain}%` },
  //     )
  //     .getOne();

  //   if (!company)
  //     throw new UnauthorizedException(
  //       `There is no such company domain : ${domain}`,
  //     );

  //   const user = await this.userService.register({
  //     companyId: company.companyId,
  //     firstName: payload.given_name,
  //     geoHierarchyId: 2,
  //     roleId: 2,
  //     organizationId: null,
  //     prePopulatedFields: ['Full Name'],
  //     imageUrl: null,
  //     lastName: payload.family_name,
  //     notificationEmail: payload.preferred_username,
  //     ssoLoginEmail: payload.preferred_username,
  //     phone: null,
  //     isExternal: false,
  //     region: payload.zoneinfo,
  //     timeZoneArea: payload.zoneinfo,
  //     isHideWelcomeText: false,
  //     isActive: true,
  //     isEnabled: true,
  //   });

  //   user.company = company;

  //   return user;
  // }

  public async oktaLogin(
    payload: Partial<JwtPayload & OktaUserinfo>,
  ): Promise<Partial<Required<OemUserEntity> & { id_token: any }>> {
    const user: OemUserEntity = await this.verifyPayload(payload);

    // if (!user) user = await this._registerNewUser(payload as OktaUserinfo);

    // console.log('OktaLogin', user);

    return {
      id_token: payload.id_token,
      ...user,
    };
  }

  public async emailLogin(email: string): Promise<boolean> {
    try {
      const user: OemUserEntity = await this.verifyPayload({
        username: email,
      });
      //TODO: all const text should be in separated files
      const subject = `Your Vendori Email Login Link`;

      const login = await this.loginUser(user);
      const redirectPartLink = process.env.EMAIL_FRONTEND_REDIRECT.split('://');
      const subdomain = NODE_ENV === 'production' ? 'app' : NODE_ENV;

      if (user.isExternal || !user.isActive || !user.isEnabled)
        throw 'Please enter a valid login email with a user that has platform access.';

      //TODO: we really need to have a separated email service!!!
      const dynamicTemplateData: EmailDynamicTemplate = {
        logoURL: VENDORI_LOGO_URL,
        CTA: `${redirectPartLink[0]}://${subdomain}.${redirectPartLink[1]}?access_token=${login.access_token}`,
        subject: subject,
        body: `To login to Vendori, please click the link below`,
        companyAddress: VENDORI_COMPANY_ADDRESS,
        subtext: 'Note: This link will remain active for 30 minutes',
        emailverify: `
        This message was sent to your email because you're a user in the ${
          user.company?.companyName || 'company'
        } Vendori account.
        To manage the frequency of future email alerts, click <a href="https://demo.vendori.com/manage-alerts">here</a> to view your in-app notification settings.`,
        showButton: true,
        ctaText: `Login`,
      };

      const emailMessage: EmailMessage = {
        subject,
        from: {
          name: 'Vendori',
          email: VENDORI_SUPPORT_EMAIL,
        },
        to: [
          {
            name: user.fullName,
            email: user.ssoLoginEmail,
          },
        ],
        templateId: MAIL_USER_INVITE_TEMPLATE_ID,
        dynamicTemplateData,
      };

      if (user) await sendGridEmailWithDynamicTemplate(emailMessage);
      else {
        new UnauthorizedException(`This user is not found: ${email}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Email Login Error', error);
      throw new UnauthorizedException(`Cannot login via email: ${email}`);
    }
  }

  async verifyPayload3dParty(
    payload: Partial<JwtPayload>,
  ): Promise<OemUserEntity> {
    const tenant = await this.tenantsService.getTenantFromNamespace();

    const getCompanyId = () =>
      tenant?.tenantId !== null ? { companyId: tenant?.tenantId } : {};
    let user: OemUserEntity;

    try {
      user = await this.userService.repo
        .createQueryBuilder('user')
        .where((qb: SelectQueryBuilder<OemUserEntity>) => {
          qb.where({
            ...getCompanyId(),
            isEnabled: true,
            isActive: true,
            isExternal: false,
          }).andWhere(
            `LOWER(user.ssoLoginEmail) = :username OR LOWER(user.notificationEmail) = :username`,
            {
              username: payload.username.toLowerCase(),
            },
          );
        })
        .leftJoinAndSelect('user.role', 'role')
        .leftJoinAndSelect('user.company', 'company')
        .getOne();
    } catch (error) {
      throw new UnauthorizedException(
        `Cannot verify external payload: ${payload.username}`,
      );
    }
    return user;
  }

  // should be use only for JWTAuth
  async verifyPayload(payload: Partial<JwtPayload>): Promise<OemUserEntity> {
    let user: OemUserEntity;

    const tenant = await this.tenantsService.getTenantFromNamespace();

    const initialUserQuery = this.userService.repo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.company', 'company');
    const whereQuery = {
      isEnabled: true,
      isActive: true,
      isExternal: false,
    };
    const emailQueryPart =
      'LOWER(user.ssoLoginEmail) = :username OR LOWER(user.notificationEmail) = :username';

    try {
      user = await initialUserQuery
        .where((qb: SelectQueryBuilder<OemUserEntity>) => {
          qb.where({
            ...(!!tenant?.tenantId && { companyId: tenant?.tenantId }),
            ...whereQuery,
          }).andWhere(
            tenant?.name
              ? `company.subdomain = :companySubdomain AND (
                 ${emailQueryPart}
                )`
              : emailQueryPart,
            {
              username: payload?.username?.toLowerCase(),
              companySubdomain: tenant?.name,
            },
          );
        })
        .getOne();

      // Users can be added to sub ENVs without being added to the first ENV so it will always throw a 404 unless we catch it
      if (!user)
        user = await initialUserQuery
          .where((qb: SelectQueryBuilder<OemUserEntity>) => {
            qb.where(whereQuery).andWhere(emailQueryPart, {
              username: payload?.username?.toLowerCase(),
            });
          })
          .getOne();

      console.log(
        'verifyUserPayload',
        payload,
        tenant,
        user?.userId,
        user?.company?.companyId,
      );
    } catch (error) {
      console.error('User Email Login Error', error);

      throw new UnauthorizedException(
        `Cannot verify payload: ${payload.username}`,
      );
    }

    return user;
  }

  async verifyPayloadExternal(
    payload: Partial<JwtPayload>,
  ): Promise<OemUserEntity> {
    let user: OemUserEntity;

    //we should add company validation here, bc the same user can be present in both companies
    const tenant = await this.tenantsService.getTenantFromNamespace();

    const getCompanyId = () =>
      tenant?.tenantId !== null ? { companyId: tenant?.tenantId } : {};

    try {
      user = await this.userService.repo.findOne({
        where: {
          ...getCompanyId(),
          ssoLoginEmail: payload.username,
          isEnabled: true,
          isActive: true,
          isExternal: true,
        },
        relations: ['role', 'company'],
      });
    } catch (error) {
      throw new UnauthorizedException(
        `Cannot verify external payload: ${payload.username}`,
      );
    }
    return user;
  }

  async signToken(user: OemUserEntity): Promise<string> {
    const payload = {
      sub: user.ssoLoginEmail,
    };

    return this.jwtService.sign(payload);
  }

  async loginUser(user: any) {
    const payload = {
      username: user.ssoLoginEmail,
      //sub: user.userId, -- we hide it
      id_token: user.id_token,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  @EventDispatcher(EventsEnum.SESSION_LOGOUT)
  async logout(req: any, res: any) {
    const id_token = req.user ? req.user.id_token : undefined;

    try {
      req.logout((r) => true);
    } catch (error) {
      console.error('Logout Failed: ', error);
    }

    // TODO: Figure out if the user logged in with Okta, Google or Salesforce first, then try to log them out at those service endpoints
    // Maybe using a session variable like 'type'
    const TrustIssuer = await Issuer.discover(
      `${process.env.OKTA_ISSUER}/.well-known/openid-configuration`,
    );

    let session: any = {};

    try {
      session = await req.session.destroy(null, (code) => {
        const end_session_endpoint = TrustIssuer.metadata.end_session_endpoint;

        // console.log(
        //   end_session_endpoint +
        //     '&post_logout_redirect_uri=' +
        //     process.env.OKTA_LOGOUT_REDIRECT_URI +
        //     (id_token ? '&id_token_hint=' + id_token : ''),
        // );
        if (end_session_endpoint)
          res.redirect(
            end_session_endpoint +
              '?post_logout_redirect_uri=' +
              process.env.OKTA_LOGOUT_REDIRECT_URI +
              (id_token ? '&id_token_hint=' + id_token : ''),
          );
        // else res.redirect('/');
        return code;
      });
    } catch (error) {
      console.error('Okta Logout Failed: ', error);
    }

    return { session };
  }
}
