import { MigrationInterface, QueryRunner } from 'typeorm';

export class addQuoteTemplateFieldToCompany1684343596816
  implements MigrationInterface
{
  name = 'addQuoteTemplateFieldToCompany1684343596816';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "oem"."oem_companies_quote_template_enum" AS ENUM('Landscape', 'ColoredLandscape', 'Portrait', 'ColoredPortrait')`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_companies" ADD "quote_template" "oem"."oem_companies_quote_template_enum" DEFAULT 'ColoredLandscape'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_companies" DROP COLUMN "quote_template"`,
    );
    await queryRunner.query(
      `DROP TYPE "oem"."oem_companies_quote_template_enum"`,
    );
  }
}
