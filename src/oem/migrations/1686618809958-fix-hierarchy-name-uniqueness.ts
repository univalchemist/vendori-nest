import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixHierarchyNameUniqueness1686618809958
  implements MigrationInterface
{
  name = 'fixHierarchyNameUniqueness1686618809958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_product_hierarchy_levels_level_name_level_key"`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "oem_product_hierarchy_levels_level_name_level_key" ON "oem"."oem_hierarchy_levels" ("level", "level_name", "hierarchy_type", "company_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "oem"."oem_product_hierarchy_levels_level_name_level_key"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_product_hierarchy_levels_level_name_level_key" ON "oem"."oem_hierarchy_levels" ("level_name", "level")`,
    );
  }
}
