import { OemBundleDto } from './oem-bundle.dto';
import { OemBundleCreateDto } from './oem-bundle.create.dto';
import { OemBundleUpdateDto } from './oem-bundle.update.dto';
import { OemBundleReplaceDto } from './oem-bundle.replace.dto';
import { BundleSerializeDto } from './oem-bundle.serialize.dto';

export const dto = {
  update: OemBundleUpdateDto,
  replace: OemBundleReplaceDto,
  create: OemBundleCreateDto,
};

export const serialize = {
  get: OemBundleDto,
  getMany: BundleSerializeDto,
  many: BundleSerializeDto,
};
