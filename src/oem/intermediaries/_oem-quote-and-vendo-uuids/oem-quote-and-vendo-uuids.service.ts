import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';

import { OemQuoteAndVendoUuid } from './oem-quote-and-vendo-uuid.entity';
import { OemQuoteAndVendoUuidReplaceDto } from './oem-quote-and-vendo-uuid.dto/oem-quote-and-vendo-uuid.replace.dto';
import { UuidTypesEnum } from './oem-quote-and-vendo.enums/uuid-types.enum';
import { CommonDefaultMethodExtension } from '../../../common/decorators/common-default-method-extention.decorator';
import { OemCompanyEntity } from '../../main/oem-companies/oem-company.entity';

@Injectable()
@CommonDefaultMethodExtension
export class OemQuoteAndVendoUuidsService extends TypeOrmCrudService<OemQuoteAndVendoUuid> {
  constructor(
    @InjectRepository(OemQuoteAndVendoUuid)
    public repo: Repository<OemQuoteAndVendoUuid>,
  ) {
    super(repo);
  }

  // TODO: we need to have a unique method to run this one in transaction with keeping SINGLE RESPONSIBILITY principals (I don't like putting manager param to foreign methods)
  // also we SHOULD NOT allow FE control lastUuid
  async updateUuid(
    quoteAndVendoUuidType: UuidTypesEnum,
    dto?: Partial<OemQuoteAndVendoUuidReplaceDto>,
    company?: OemCompanyEntity,
  ): Promise<OemQuoteAndVendoUuid | any> {
    const quoteAndVendoUuid: OemQuoteAndVendoUuid = await this.repo.findOne({
      where: {
        quoteAndVendoUuidType,
        companyId: company?.companyId,
      },
    });

    if (
      dto?.lastUuid &&
      dto.lastUuid <= (quoteAndVendoUuid && quoteAndVendoUuid.lastUuid)
    ) {
      return quoteAndVendoUuid;
    }

    const lastUuid = quoteAndVendoUuid
      ? dto?.lastUuid || quoteAndVendoUuid.lastUuid + 1
      : dto?.lastUuid || 1;

    const prefix =
      dto?.prefix ||
      quoteAndVendoUuid?.prefix ||
      (quoteAndVendoUuidType === UuidTypesEnum.QUOTE ? 'Q-' : 'V-');

    const quoteAndVendoUuidData: Partial<OemQuoteAndVendoUuid> = {
      ...quoteAndVendoUuid,
      ...dto,
      quoteAndVendoUuidType,
      lastUuid,
      prefix,
    };

    console.log(
      'quoteAndVendoUuid',
      quoteAndVendoUuid,
      lastUuid,
      company,
      quoteAndVendoUuidData,
    );

    // This is seeded so no need to recreate
    // console.log('updateUuid', quoteAndVendoUuid);
    // if (!quoteAndVendoUuid?.quoteAndVendoUuidId)
    //   this.repo.create(quoteAndVendoUuidData);

    return this.repo.save(quoteAndVendoUuidData, { transaction: false }); // we should remove CRUD framework transaction here due set session previoulsy
  }

  /**
   * @deprecated The method should not be used
   */
  async replaceOne(
    req: CrudRequest,
    dto: Partial<OemQuoteAndVendoUuidReplaceDto>,
  ): Promise<OemQuoteAndVendoUuid> {
    const quoteAndVendoUuidType = req.parsed.paramsFilter.find(
      (params) => params.field === req.options.params.uuidType.field,
    );
    return this.updateUuid(
      quoteAndVendoUuidType.value,
      dto,
      req['user']?.company,
    );
  }
}
