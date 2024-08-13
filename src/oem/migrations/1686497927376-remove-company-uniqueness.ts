import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeCompanyUniqueness1686497927376
  implements MigrationInterface
{
  name = 'removeCompanyUniqueness1686497927376';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table "oem"."oem_companies" drop constraint IF EXISTS "UQ_b90dfeb457229ccecdd3e581929";`,
    );
    await queryRunner.query(
      `alter table "oem"."oem_companies" drop constraint IF EXISTS "UQ_d841e398b10978b6833e5882e95";`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_companies" ADD CONSTRAINT "UQ_b90dfeb457229ccecdd3e581929" UNIQUE ("subdomain")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_companies" ADD CONSTRAINT "UQ_d841e398b10978b6833e5882e95" UNIQUE ("email_domain")`,
    );
  }
}
