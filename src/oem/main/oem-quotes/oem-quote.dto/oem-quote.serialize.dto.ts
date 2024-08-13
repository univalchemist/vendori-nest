import { QuoteDto } from './oem-quote.dto';
import { OemQuoteEntity } from '../oem-quote.entity';
import { OmitType } from '@nestjs/swagger';
// import { Exclude } from 'class-transformer';
// import { ISalesforceMetaData } from '../../../../shared/salesforce/salesforce.types/salesforce.sf_metadata.type';

/**
 * make more clear for swagger DTO (without OEM prefix)
 */
export class QuoteSerializeDto extends OmitType(QuoteDto, [
  'pinCode',
] as const) {
  constructor(data: OemQuoteEntity) {
    super();
  }
  isApprovalTurn: boolean;

  // @Exclude()
  // sfMetaData: ISalesforceMetaData;
}

export { QuoteSerializeDto as OemQuoteSerializeDto };
