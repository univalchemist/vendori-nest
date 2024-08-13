import { Column } from 'typeorm';

/*@Entity()*/
export class SfUserMetadataEntity {
  @Column('character varying', {
    name: 'sf_user_id',
    nullable: true,
    length: 24,
  })
  sfUserId: string | null;

  @Column({
    type: 'character varying',
    name: 'sf_opportunity_contact_role_id',
    length: 36,
    nullable: true,
    default: null,
  })
  sfOpportunityContactRoleId: string | null;

  @Column({
    type: 'character varying',
    name: 'sf_contact_id',
    length: 36,
    nullable: true,
    default: null,
  })
  sfContactId: string | null;
}
