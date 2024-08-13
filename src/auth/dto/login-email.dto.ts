import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginEmailDto {
  @IsNotEmpty()
  @Matches(/^[\_\-.+0-9a-z]{1,90}@[^\.]{1,90}\.[a-z]{1,5}$/i, {
    message: `Please specify a valid email address`,
  })
  public email: string;
}
