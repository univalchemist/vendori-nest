import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixQuoteAnd0vendoUuid1686596147030 implements MigrationInterface {
  name = 'fixQuoteAnd0vendoUuid1686596147030';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vendos_vendo_uuid_key"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("vendo_uuid", "company_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("vendo_uuid")`,
    );
  }
}
