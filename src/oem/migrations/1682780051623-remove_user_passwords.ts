import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeUserPasswords1682780051623 implements MigrationInterface {
  name = 'removeUserPasswords1682780051623';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" DROP COLUMN "password_encrypted"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" ADD "password_encrypted" character varying(60)`,
    );
  }
}
