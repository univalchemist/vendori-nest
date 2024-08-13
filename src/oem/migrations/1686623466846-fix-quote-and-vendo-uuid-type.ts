import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixQuoteAndVendoUuidType1686623466846
  implements MigrationInterface
{
  name = 'fixQuoteAndVendoUuidType1686623466846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quote_and_vendo_uuid_last_uuid_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT IF EXISTS "PK_1c3d09dc7c17faf33b1e35529e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE oem.oem_quote_and_vendo_uuids ADD quote_and_vendo_uuid_id serial CONSTRAINT PK_15acdb64c37f80fb410fd4b8309 PRIMARY KEY`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vendos_vendo_uuid_key"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT IF EXISTS "FK_1d091dd76b7dd1d2728bc248c6b"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quote_and_vendo_uuid_pkey"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("vendo_uuid", "company_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_quote_and_vendo_uuid_last_uuid_idx" ON "oem"."oem_quote_and_vendo_uuids" ("last_uuid", "company_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_quote_and_vendo_uuid_id_idx" ON "oem"."oem_quote_and_vendo_uuids" ("company_id", "quote_and_vendo_uuid_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "oem_quote_and_vendo_uuid_pkey" ON "oem"."oem_quote_and_vendo_uuids" ("quote_and_vendo_uuid_type", "company_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" ADD CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b"`,
    );
    await queryRunner.query(`DROP INDEX "oem"."oem_quote_and_vendo_uuid_pkey"`);
    await queryRunner.query(
      `DROP INDEX "oem"."oem_quote_and_vendo_uuid_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "oem"."oem_quote_and_vendo_uuid_last_uuid_idx"`,
    );
    await queryRunner.query(`DROP INDEX "oem"."oem_vendos_vendo_uuid_key"`);
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT "PK_15acdb64c37f80fb410fd4b8309"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quote_and_vendo_uuid_pkey" ON "oem"."oem_quote_and_vendo_uuids" ("quote_and_vendo_uuid_type", "company_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" ADD CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("company_id", "vendo_uuid") `,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" ADD CONSTRAINT "PK_1c3d09dc7c17faf33b1e35529e1" PRIMARY KEY ("quote_and_vendo_uuid_type")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP COLUMN "quote_and_vendo_uuid_id"`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_quote_and_vendo_uuid_last_uuid_idx" ON "oem"."oem_quote_and_vendo_uuids" ("last_uuid") `,
    );
  }
}
