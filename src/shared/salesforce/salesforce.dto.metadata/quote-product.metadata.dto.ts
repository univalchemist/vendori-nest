import { IsOptional } from 'class-validator';

export class SfProductMetadataDto {
  /**
   * The Salesforce product id
   * Used in Salesforce
   * @example 0065f00000995z2AAA
   */
  @IsOptional()
  sfOpportunityProductId: string | null;
}
