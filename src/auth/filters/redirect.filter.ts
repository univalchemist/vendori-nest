import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { APP_ROOT_URL } from '../../environments';

@Catch()
export class RedirectFilter<T> implements ExceptionFilter {
  catch(exception: UnauthorizedException | any, host: ArgumentsHost): any {
    console.error('AuthRedirect', exception);
    const redirectLink = process.env.GOOGLE_FRONTEND_REDIRECT;
    // TODO: need to use config here
    host
      .switchToHttp()
      .getResponse()
      .redirect(
        `${redirectLink}/login?login_error_code=${
          (exception.getStatus && exception.getStatus()) || 404
        }`,
      );
  }
}
