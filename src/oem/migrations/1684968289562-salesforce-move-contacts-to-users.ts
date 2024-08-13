import { MigrationInterface, QueryRunner } from 'typeorm';

export class salesforceMoveContactsToUsers1684968289562
  implements MigrationInterface
{
  name = 'salesforceMoveContactsToUsers1684968289562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes_users" ADD "sf_opportunity_contact_role_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" ADD "sf_opportunity_contact_role_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" ADD "sf_contact_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes_contacts" DROP COLUMN "sf_opportunity_contact_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_contacts" DROP COLUMN "sf_contact_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" DROP COLUMN "sf_contact_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" DROP COLUMN "sf_opportunity_contact_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes_users" DROP COLUMN "sf_opportunity_contact_role_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_contacts" ADD "sf_contact_id" character varying(36)`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes_contacts" ADD "sf_opportunity_contact_role_id" character varying(36)`,
    );
  }
}
