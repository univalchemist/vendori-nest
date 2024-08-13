import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Validate,
} from 'class-validator';
import { IsUserEnabled } from '../oem-user.validators/oem-user.validator';

export class OemUserDeleteDto {
  /**
   * The id of Replaced User
   * @example 1
   */
  @IsOptional()
  @IsNumberString()
  @IsNotEmpty()
  @Validate(IsUserEnabled)
  replaceUserId: number;
}
