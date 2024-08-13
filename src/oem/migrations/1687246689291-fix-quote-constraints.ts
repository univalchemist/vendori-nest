import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixQuoteConstraints1687246689291 implements MigrationInterface {
  name = 'fixQuoteConstraints1687246689291';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT IF EXISTS "UQ_54880fb42ae75c726aad0455b0d"`,
    );
    await queryRunner.query(
      `drop index if exists oem.oem_quotes_quote_uuid_key`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quotes_quote_uuid_key" ON "oem"."oem_quotes" ("company_id", "quote_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" ADD CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" ADD CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quotes_quote_uuid_key" ON "oem"."oem_quotes" ("quote_uuid") `,
    );
  }
}
