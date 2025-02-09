import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Repository } from 'typeorm';

import { OemUserEntity } from '../oem-user.entity';
import { SetCurrentTenant } from '../../../../common/decorators/set-current-tenant.decorator';

@ValidatorConstraint({ name: 'isUserEnabled', async: true })
@Injectable()
@SetCurrentTenant
export class IsUserEnabled implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(OemUserEntity)
    private readonly repo: Repository<OemUserEntity>,
  ) {}

  async validate(userId: number): Promise<boolean> {
    try {
      const user = await this.repo.findOne({
        userId: userId,
        isEnabled: false,
      });

      return !user;
    } catch (e) {
      throw new BadRequestException('Cannot validate replaced user');
    }
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The user is disabled';
  }
}

@ValidatorConstraint({ name: 'isUserEmailAlreadyExist', async: true })
@Injectable()
// this decorator wrap defaultMessage by promise, that's why error messaging doesn't work
@SetCurrentTenant
export class IsUserEmailAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(OemUserEntity)
    private readonly repo: Repository<OemUserEntity>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.repo.findOne({
      ssoLoginEmail: email,
      isEnabled: true,
      isExternal: false,
    });

    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'The email «$value» is already registered.';
  }
}

@ValidatorConstraint({ name: 'isPhoneAlreadyExist', async: true })
@Injectable()
@SetCurrentTenant
export class IsPhoneAlreadyExist implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(OemUserEntity)
    private readonly repo: Repository<OemUserEntity>,
  ) {}

  async validate(phone: string): Promise<boolean> {
    const user = await this.repo.findOne({ phone, isEnabled: true });

    // phone should be null or not existing one
    return !user?.phone;
  }

  defaultMessage(): string {
    return 'The phone number «$value» is already registered.';
  }
}
