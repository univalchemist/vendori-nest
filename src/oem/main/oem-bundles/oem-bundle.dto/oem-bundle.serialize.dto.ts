import { BundleDto } from './oem-bundle.dto';
import { OmitType } from '@nestjs/swagger';
import { BundleEntity } from '../oem-bundle.entity';

/**
 * make more clear for swagger DTO (without OEM prefix)
 */
export class BundleSerializeDto extends OmitType(BundleDto, []) {
  constructor(data: Partial<BundleEntity[] | BundleEntity> = {}) {
    super();

    if (!!data && data['length'])
      data = (data || [])['filter']((r) => r.products.length > 0);

    Object.assign(this, data);
  }
}
