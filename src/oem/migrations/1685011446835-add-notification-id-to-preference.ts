import { MigrationInterface, QueryRunner } from 'typeorm';

export class addNotificationIdToPreference1685011446835 implements MigrationInterface {
  name = 'addNotificationIdToPreference1685011446835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "oem"."oem_notification_preferences_pkey"`);
    await queryRunner.query(`ALTER TABLE "oem"."oem_notification_preferences" ADD "notification_id" integer`);
    await queryRunner.query(`CREATE UNIQUE INDEX "oem_notification_preferences_pkey" ON "oem"."oem_notification_preferences" ("user_id", "company_id") `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "oem"."oem_notification_preferences_pkey"`);
    await queryRunner.query(`ALTER TABLE "oem"."oem_notification_preferences" DROP COLUMN "notification_id"`);
    await queryRunner.query(`CREATE UNIQUE INDEX "oem_notification_preferences_pkey" ON "oem"."oem_notification_preferences" ("user_id") `);

  }

}
