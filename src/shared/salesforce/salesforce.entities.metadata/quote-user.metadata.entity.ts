import { Column } from 'typeorm';

/*@Entity()*/
export class SfQuoteContactMetadataEntity {
  @Column({
    type: 'character varying',
    name: 'sf_opportunity_contact_role_id',
    length: 36,
    nullable: true,
    default: null,
  })
  sfOpportunityContactRoleId: string | null;
}
