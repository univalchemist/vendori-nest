import { ProductsRelationshipsDto } from './oem-products-relationships.dto';
import { OmitType } from '@nestjs/swagger';
import { ProductsRelationships } from '../oem-products-relationships.entity';

/**
 * make more clear for swagger DTO (without OEM prefix)
 */
export class ProductsRelationshipSerializeDto extends OmitType(
  ProductsRelationshipsDto,
  [],
) {
  constructor(
    data: Partial<ProductsRelationships | ProductsRelationships[]> = {},
  ) {
    super();

    if (!!data && data['length'])
      data = (data || [])['filter'](
        (r) =>
          (!!r.sourceBundle && !!r.targetBundle) ||
          (!!r.sourceProduct && !!r.targetProduct),
      );

    Object.assign(this, data);
  }
}
