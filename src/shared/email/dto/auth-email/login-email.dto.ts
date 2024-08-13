import { EmailAddress } from '../../types/email-address.type';

export class LoginEmailDTO {
  subdomain: string;
  accessToken: string;
  emailList: EmailAddress[];
}
