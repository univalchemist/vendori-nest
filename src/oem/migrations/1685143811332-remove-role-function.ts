import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeRoleFunction1685143811332 implements MigrationInterface {
  name = 'removeRoleFunction1685143811332';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "oem"."oem_roles" DROP COLUMN "function_type"`);
    await queryRunner.query(`DROP TYPE "oem"."oem_roles_function_type_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "oem"."oem_roles_function_type_enum" AS ENUM('Admin', 'Channel', 'Sales')`);
    await queryRunner.query(`ALTER TABLE "oem"."oem_roles" ADD "function_type" "oem"."oem_roles_function_type_enum"`);

  }

}
