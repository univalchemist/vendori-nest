import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFieldsToVendosUsers1685121271832 implements MigrationInterface {
  name = 'addFieldsToVendosUsers1685121271832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos_users" ADD "show_on_pdf" boolean NOT NULL DEFAULT true`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos_users" ADD "send_notification" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos_users" DROP COLUMN "show_on_pdf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos_users" DROP COLUMN "send_notification"`,
    );
  }
}
