import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSalesforceIntegrationUniqueness1686509934863
  implements MigrationInterface
{
  name = 'removeSalesforceIntegrationUniqueness1686509934863';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" DROP CONSTRAINT "UQ_1c56925d67234fa7c1fac095f37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ALTER COLUMN "company_id" SET DEFAULT current_setting('doemdem876fghRf.current_tenant')::int`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" DROP CONSTRAINT "UQ_5a30b1ae8b3e8e41cb1f6bafddf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" DROP CONSTRAINT "UQ_7e7be0e6b33abc16e0d25db89a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" DROP CONSTRAINT "UQ_d0c9610f75f9a3705baa908cf36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" DROP CONSTRAINT "UQ_bb52827ffc7eb2936af1b094c32"`,
    );

    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_password_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_password", "company_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_username_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_username", "company_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_secret_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_client_secret", "company_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_url_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_url", "company_id") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_id_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_client_id", "company_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "oem"."oem_salesforce_integration_salesforce_client_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "oem"."oem_salesforce_integration_salesforce_url_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "oem"."oem_salesforce_integration_salesforce_client_secret_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "oem"."oem_salesforce_integration_salesforce_username_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX "oem"."oem_salesforce_integration_salesforce_password_idx"`,
    );

    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ADD CONSTRAINT "UQ_bb52827ffc7eb2936af1b094c32" UNIQUE ("salesforce_password")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ADD CONSTRAINT "UQ_d0c9610f75f9a3705baa908cf36" UNIQUE ("salesforce_username")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ADD CONSTRAINT "UQ_7e7be0e6b33abc16e0d25db89a0" UNIQUE ("salesforce_client_secret")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ADD CONSTRAINT "UQ_5a30b1ae8b3e8e41cb1f6bafddf" UNIQUE ("salesforce_client_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ALTER COLUMN "company_id" SET DEFAULT (current_setting('doemdem876fghRf.current_tenant'))`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_salesforce_integrations" ADD CONSTRAINT "UQ_1c56925d67234fa7c1fac095f37" UNIQUE ("salesforce_url")`,
    );
  }
}
