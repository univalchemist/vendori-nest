import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Request } from 'express';
import { AuthUser } from '../oem/main/oem-users/oem-users.decorators/auth-user.decorator';
import { User } from '../oem/main/oem-users/oem-user.entity';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../oem/main/oem-users/oem-user.dto/oem-user.create.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { UserSerializeDto } from '../oem/main/oem-users/oem-user.dto/oem-user.serialize.dto';
import { OpenidAuthGuard } from './guards/openid-auth.guard';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { LoginEmailDto } from './dto/login-email.dto';
import { RedirectFilter } from './filters/redirect.filter';
import { OemCompanyEntity } from '../oem/main/oem-companies/oem-company.entity';
import { SalesforceOauthGuard } from './guards/salesforce-auth.guard';
import { NODE_ENV } from '../environments';

//TODO: add ConfigService
@ApiTags('Users')
@Controller('sessions')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // // Vendori is passwordless for now.
  //
  // @ApiOperation({ description: 'Register a user. *NOW WE ARE USING ONLY OKTA' })
  // @Post('register')
  // @HttpCode(HttpStatus.CREATED)
  // @UseInterceptors(TokenInterceptor)
  // register(@Body() signUp: UserCreateDto): Promise<UserSerializeDto> {
  //   return this.authService.register(signUp);
  // }
  //
  // @ApiBearerAuth('JWT-auth')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       ssoLoginEmail: { type: 'string' },
  //       password: { type: 'string' },
  //     },
  //   },
  // })
  // @Post('login')
  // @UseGuards(LocalAuthGuard)
  // @HttpCode(HttpStatus.OK)
  // @UseInterceptors(TokenInterceptor)
  // async login(@AuthUser() user: User) {
  //   return this.authService.loginUser(user);
  // }
  //

  @ApiOperation({ description: 'Using okta token for getting a user' })
  @Post('login/okta')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(LocalAuthGuard)
  @UseGuards(AuthGuard('bearer'))
  async loginOkta(@Req() req: Request): Promise<UserSerializeDto> {
    const token: string = req.headers?.authorization?.replace('Bearer ', '');
    return this.authService.oktaValidateToken(token);
  }

  // todo: we need use interceptor serialization here
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    description: 'Returning a user from token/cookie.',
  })
  @Get('/me')
  @UseGuards(SessionAuthGuard, JWTAuthGuard) // Can't control the selected sub-user
  async me(
    @AuthUser() user: User,
    @Req() req: Request,
  ): Promise<UserSerializeDto> {
    console.log(
      '/me',
      {
        userId: user.userId,
        email: user.ssoLoginEmail,
        companyId: user.company.companyId,
        requestXCompanyHeader: req.headers['x-company'],
        requestUser: req['user'],
      },
      // new UserSerializeDto(user),
    );

    if (user.company.subdomain !== `${req.headers['x-company']}`)
      user = await this.authService.getUserForCompany(
        user,
        `${req.headers['x-company']}`,
      );

    return new UserSerializeDto(user);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    description:
      'Returning current user accounts from all companies in system.',
  })
  @Get('/my-accounts')
  @UseGuards(SessionAuthGuard, JWTAuthGuard) // Can't control the selected sub-user
  getMyAccounts(@AuthUser() user: User): Promise<Array<OemCompanyEntity>> {
    return this.authService.getMyAccounts(user);
  }

  /**
   * We should SET ACCESS_TOKEN IN HEADERS like A BEARER TOKEN ! ! !
   */
  @ApiOperation({
    description:
      'Okta signIn, returns internal jwt-token by redirecting query param. Should be set like a bearer header in request.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(OpenidAuthGuard)
  @Get('/login')
  @UseInterceptors(TokenInterceptor)
  loginOidc() {}

  /**
   * We should SET ACCESS_TOKEN IN HEADERS like A BEARER TOKEN ! ! !
   */
  @ApiOperation({
    description:
      'Google signIn, returns internal jwt-token by redirecting query param. Should be set like a bearer header in request.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(GoogleOauthGuard)
  @Get('/login/google')
  @UseInterceptors(TokenInterceptor)
  loginGoogle() {}

  /**
   * We should SET ACCESS_TOKEN IN HEADERS like A BEARER TOKEN ! ! !
   */
  @ApiOperation({
    description:
      'Salesforce signIn, returns internal jwt-token by redirecting query param. Should be set like a bearer header in request.',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(SalesforceOauthGuard)
  @Get('/login/salesforce')
  @UseInterceptors(TokenInterceptor)
  loginSalesforce() {}

  /**
   * We should SET ACCESS_TOKEN IN HEADERS like A BEARER TOKEN ! ! !
   */
  //TODO: we should add DTO here for email validation
  @ApiOperation({
    description: 'Send an email with an authorization link',
  })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TokenInterceptor)
  @Get('/login/email')
  loginEmail(
    @Query() query: LoginEmailDto,
    // new ValidationPipe({
    //   transform: true,
    //   transformOptions: { enableImplicitConversion: true },
    //   forbidNonWhitelisted: true,
    // }),
  ): Promise<boolean> {
    return this.authService.emailLogin(query.email);
  }

  /**
   * Google Redirect
   */
  @UseGuards(SessionAuthGuard, GoogleOauthGuard)
  @UseFilters(RedirectFilter)
  @Get('/google/redirect')
  async loginGoogleCallback(@AuthUser() user: User, @Req() req, @Res() res) {
    if (user?.isExternal)
      throw 'Please enter a valid login email with a user that has platform access.';

    const response = await this.authService.loginUser(user);
    const redirectPartLink = process.env.GOOGLE_FRONTEND_REDIRECT.split('://');
    const subdomain = NODE_ENV === 'production' ? 'app' : NODE_ENV;

    // res.setHeader('Authorization', `Bearer ${response.access_token}`);
    res.redirect(
      `${redirectPartLink[0]}://${subdomain}.${redirectPartLink[1]}?access_token=${response.access_token}`,
    );
  }

  /**
   * SalesForce Redirect
   */
  @UseGuards(SessionAuthGuard, SalesforceOauthGuard)
  @UseFilters(RedirectFilter)
  @Get('/salesforce/redirect')
  async loginSalesforceCallback(
    @AuthUser() user: User,
    @Req() req,
    @Res() res,
  ) {
    if (user?.isExternal)
      throw 'Please enter a valid login email with a user that has platform access.';

    const response = await this.authService.loginUser(user);
    const redirectPartLink = process.env.GOOGLE_FRONTEND_REDIRECT.split('://');
    const subdomain = NODE_ENV === 'production' ? 'app' : NODE_ENV;

    res.setHeader('Authorization', `Bearer ${response.access_token}`);

    // console.log("@Get('/salesforce/redirect')", response);

    res.redirect(
      `${redirectPartLink[0]}://${subdomain}.${redirectPartLink[1]}?access_token=${response.access_token}`,
    );
  }

  /**
   * Okta Redirect
   */
  @UseGuards(SessionAuthGuard, OpenidAuthGuard)
  @UseFilters(RedirectFilter)
  @Get('/authorization-code/callback')
  async loginOktaCallback(@AuthUser() user: User, @Req() req, @Res() res) {
    if (user?.isExternal)
      throw 'Please enter a valid login email with a user that has platform access.';

    const response = await this.authService.loginUser(user);
    const redirectPartLink = process.env.OKTA_FRONTEND_REDIRECT.split('://');
    const subdomain = NODE_ENV === 'production' ? 'app' : NODE_ENV;

    res.redirect(
      `${redirectPartLink[0]}://${subdomain}.${redirectPartLink[1]}?access_token=${response.access_token}`,
    );
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(SessionAuthGuard, JWTAuthGuard)
  @Get('/logout')
  async logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res);
  }
}
