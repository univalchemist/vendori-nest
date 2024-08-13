import { OemProductsRelationshipsDto } from './oem-products-relationships.dto';
import { OemProductsRelationshipsUpdateDto } from './oem-products-relationships.update.dto';
import { ProductsRelationshipSerializeDto } from './oem-products-relationships.serialize.dto';

export const dto = {
  create: OemProductsRelationshipsDto,
  update: OemProductsRelationshipsUpdateDto,
  replace: OemProductsRelationshipsDto,
};

export const serialize = {
  get: ProductsRelationshipSerializeDto,
  many: ProductsRelationshipSerializeDto,
  getMany: ProductsRelationshipSerializeDto,
};
