import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixUniqueness1686619898995 implements MigrationInterface {
  name = 'fixUniqueness1686619898995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_products" DROP CONSTRAINT IF EXISTS "FK_ad976b8b5d2898f834d4a102ee7"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_company_programs_channel_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_products_pricing_model_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quotes_customer_products_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_customers_customer_email_key"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quote_and_vendo_uuid_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_company_id_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchy_levels" DROP CONSTRAINT IF EXISTS "FK_d44357927326764ec69336fa2cd"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_product_hierarchy_levels_level_name_level_key"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_programs" DROP CONSTRAINT IF EXISTS "FK_94cd4d42abc977df4bb44485b54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_licensing_programs" DROP CONSTRAINT IF EXISTS "FK_997f11267d8885b0f826e393642"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channels" DROP CONSTRAINT IF EXISTS "FK_92d17119739056d2abf91f79d23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchies" DROP CONSTRAINT IF EXISTS "FK_1629c814fc24d7c3b85b8f364a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos" DROP CONSTRAINT IF EXISTS "FK_1e5cf2d8d1c1fb0731361dbb60f"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vendos_vendo_uuid_key"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendo_approval_queues" DROP CONSTRAINT IF EXISTS "FK_51048a498eb46f2bb44ad77d33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notifications" DROP CONSTRAINT IF EXISTS "FK_25c9e6831f309eb607f22422a27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_bundles_products" DROP CONSTRAINT IF EXISTS "FK_ec94be417de8acc5a059e51aa54"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "oem"."oem_products_pkey"`);
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_external_users" DROP CONSTRAINT IF EXISTS "FK_7179f06982b5c3f5f24907730b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT IF EXISTS "FK_0fe22bb3526f24501c6bbd50903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" ADD CONSTRAINT "UQ_54880fb42ae75c726aad0455b0d" UNIQUE ("quote_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_approval_queues" DROP CONSTRAINT IF EXISTS "FK_0f31c77043511f53795baedbf3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_approval_queue_priorities" DROP CONSTRAINT IF EXISTS "FK_ca8d1018341aeb51998565a81c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_roles" DROP CONSTRAINT IF EXISTS "FK_a067e45b1d138a2d2804536952d"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_roles_role_name_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_shading_rules" DROP CONSTRAINT IF EXISTS "FK_2145b22898d173eb4baa09a693f"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_shading_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vacation_rules" DROP CONSTRAINT IF EXISTS "FK_7b3b942111796a60a0ac2124cfb"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vacation_rule_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_discount_rules_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_discount_rules_discount_rule_name_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notification_preferences" DROP CONSTRAINT IF EXISTS "FK_86353525ec76a6bdd0d5caaa685"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_notification_preferences_pkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_saved_alert_rules" DROP CONSTRAINT IF EXISTS "FK_0f888ce595cd4ee5a65d3c1f1e8"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_saved_alert_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" DROP CONSTRAINT IF EXISTS "FK_95598311afd09290acc5dbaaf3a"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_users_sso_login_email_phone_key"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_pricing_models" DROP CONSTRAINT IF EXISTS "FK_e87a13cefe49077059dc9eba56a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_customer_addresses" DROP CONSTRAINT IF EXISTS "FK_c5e0fafa9da276bdfe502349e23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_addresses" DROP CONSTRAINT IF EXISTS "FK_cfe0bcdbd1fa9de9f2f7a08fe95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_workflow_rules" DROP CONSTRAINT IF EXISTS "FK_9626685ffa8340165fe40c5b015"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_workflow_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT IF EXISTS "FK_1d091dd76b7dd1d2728bc248c6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" DROP CONSTRAINT IF EXISTS "FK_e796879259096b4359cc09cbbc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" DROP CONSTRAINT IF EXISTS "FK_bec078375a29993d3c232b6e671"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" ADD CONSTRAINT "UQ_bec078375a29993d3c232b6e671" UNIQUE ("address_id")`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_password_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_username_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_client_secret_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_url_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_client_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."IDX_ec94be417de8acc5a059e51aa5"`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_product_hierarchy_levels_level_name_level_key" ON "oem"."oem_hierarchy_levels" ("level", "level_name", "hierarchy_type", "company_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_company_programs_channel_id_idx" ON "oem"."oem_company_programs" ("channel_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("vendo_uuid", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_products_pkey" ON "oem"."oem_products" ("product_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quotes_customer_products_pkey" ON "oem"."oem_quotes_customer_products" ("quote_customer_product_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_roles_role_name_idx" ON "oem"."oem_roles" ("company_id", "role_name")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_shading_rules_rule_name_idx" ON "oem"."oem_shading_rules" ("shading_rule_name", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vacation_rule_rule_name_idx" ON "oem"."oem_vacation_rules" ("name", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_discount_rules_discount_rule_name_idx" ON "oem"."oem_discount_rules" ("discount_rule_name", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_discount_rules_pkey" ON "oem"."oem_discount_rules" ("discount_rule_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_notification_preferences_pkey" ON "oem"."oem_notification_preferences" ("user_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_saved_alert_rules_rule_name_idx" ON "oem"."oem_saved_alert_rules" ("name", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_users_sso_login_email_phone_key" ON "oem"."oem_users" ("phone", "sso_login_email", "company_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_products_pricing_model_id_idx" ON "oem"."oem_products" ("pricing_model_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_workflow_rules_rule_name_idx" ON "oem"."oem_workflow_rules" ("workflow_rule_name", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quote_and_vendo_uuid_pkey" ON "oem"."oem_quote_and_vendo_uuids" ("quote_and_vendo_uuid_type", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_password_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_password", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_username_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_username", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_secret_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_client_secret", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_url_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_url", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_id_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_client_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec94be417de8acc5a059e51aa5" ON "oem"."oem_bundles_products" ("company_id", "product_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchy_levels" ADD CONSTRAINT "FK_d44357927326764ec69336fa2cd" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_programs" ADD CONSTRAINT "FK_94cd4d42abc977df4bb44485b54" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_licensing_programs" ADD CONSTRAINT "FK_997f11267d8885b0f826e393642" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channels" ADD CONSTRAINT "FK_92d17119739056d2abf91f79d23" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchies" ADD CONSTRAINT "FK_1629c814fc24d7c3b85b8f364a6" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos" ADD CONSTRAINT "FK_1e5cf2d8d1c1fb0731361dbb60f" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendo_approval_queues" ADD CONSTRAINT "FK_51048a498eb46f2bb44ad77d33a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notifications" ADD CONSTRAINT "FK_25c9e6831f309eb607f22422a27" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_external_users" ADD CONSTRAINT "FK_7179f06982b5c3f5f24907730b8" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" ADD CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_approval_queues" ADD CONSTRAINT "FK_0f31c77043511f53795baedbf3a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_approval_queue_priorities" ADD CONSTRAINT "FK_ca8d1018341aeb51998565a81c4" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_roles" ADD CONSTRAINT "FK_a067e45b1d138a2d2804536952d" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_shading_rules" ADD CONSTRAINT "FK_2145b22898d173eb4baa09a693f" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vacation_rules" ADD CONSTRAINT "FK_7b3b942111796a60a0ac2124cfb" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notification_preferences" ADD CONSTRAINT "FK_86353525ec76a6bdd0d5caaa685" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_saved_alert_rules" ADD CONSTRAINT "FK_0f888ce595cd4ee5a65d3c1f1e8" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" ADD CONSTRAINT "FK_95598311afd09290acc5dbaaf3a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_products" ADD CONSTRAINT "FK_ad976b8b5d2898f834d4a102ee7" FOREIGN KEY ("pricing_model_id") REFERENCES "oem"."oem_pricing_models"("pricing_model_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_pricing_models" ADD CONSTRAINT "FK_e87a13cefe49077059dc9eba56a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_customer_addresses" ADD CONSTRAINT "FK_c5e0fafa9da276bdfe502349e23" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_addresses" ADD CONSTRAINT "FK_cfe0bcdbd1fa9de9f2f7a08fe95" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_workflow_rules" ADD CONSTRAINT "FK_9626685ffa8340165fe40c5b015" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" ADD CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" ADD CONSTRAINT "FK_e796879259096b4359cc09cbbc1" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" ADD CONSTRAINT "FK_bec078375a29993d3c232b6e671" FOREIGN KEY ("address_id") REFERENCES "oem"."oem_addresses"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_bundles_products" ADD CONSTRAINT "FK_ec94be417de8acc5a059e51aa54" FOREIGN KEY ("company_id", "product_id") REFERENCES "oem"."oem_products"("company_id","product_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_bundles_products" DROP CONSTRAINT IF EXISTS "FK_ec94be417de8acc5a059e51aa54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" DROP CONSTRAINT IF EXISTS "FK_bec078375a29993d3c232b6e671"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" DROP CONSTRAINT IF EXISTS "FK_e796879259096b4359cc09cbbc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" DROP CONSTRAINT IF EXISTS "FK_1d091dd76b7dd1d2728bc248c6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_workflow_rules" DROP CONSTRAINT IF EXISTS "FK_9626685ffa8340165fe40c5b015"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_addresses" DROP CONSTRAINT IF EXISTS "FK_cfe0bcdbd1fa9de9f2f7a08fe95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_customer_addresses" DROP CONSTRAINT IF EXISTS "FK_c5e0fafa9da276bdfe502349e23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_pricing_models" DROP CONSTRAINT IF EXISTS "FK_e87a13cefe49077059dc9eba56a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_products" DROP CONSTRAINT IF EXISTS "FK_ad976b8b5d2898f834d4a102ee7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" DROP CONSTRAINT IF EXISTS "FK_95598311afd09290acc5dbaaf3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_saved_alert_rules" DROP CONSTRAINT IF EXISTS "FK_0f888ce595cd4ee5a65d3c1f1e8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notification_preferences" DROP CONSTRAINT IF EXISTS "FK_86353525ec76a6bdd0d5caaa685"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vacation_rules" DROP CONSTRAINT IF EXISTS "FK_7b3b942111796a60a0ac2124cfb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_shading_rules" DROP CONSTRAINT IF EXISTS "FK_2145b22898d173eb4baa09a693f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_roles" DROP CONSTRAINT IF EXISTS "FK_a067e45b1d138a2d2804536952d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_approval_queue_priorities" DROP CONSTRAINT IF EXISTS "FK_ca8d1018341aeb51998565a81c4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_approval_queues" DROP CONSTRAINT IF EXISTS "FK_0f31c77043511f53795baedbf3a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT IF EXISTS "FK_0fe22bb3526f24501c6bbd50903"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_external_users" DROP CONSTRAINT IF EXISTS "FK_7179f06982b5c3f5f24907730b8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notifications" DROP CONSTRAINT IF EXISTS "FK_25c9e6831f309eb607f22422a27"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendo_approval_queues" DROP CONSTRAINT IF EXISTS "FK_51048a498eb46f2bb44ad77d33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos" DROP CONSTRAINT IF EXISTS "FK_1e5cf2d8d1c1fb0731361dbb60f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchies" DROP CONSTRAINT IF EXISTS "FK_1629c814fc24d7c3b85b8f364a6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channels" DROP CONSTRAINT IF EXISTS "FK_92d17119739056d2abf91f79d23"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_licensing_programs" DROP CONSTRAINT IF EXISTS "FK_997f11267d8885b0f826e393642"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_programs" DROP CONSTRAINT IF EXISTS "FK_94cd4d42abc977df4bb44485b54"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchy_levels" DROP CONSTRAINT IF EXISTS "FK_d44357927326764ec69336fa2cd"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."IDX_ec94be417de8acc5a059e51aa5"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_client_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_url_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_client_secret_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_username_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_salesforce_integration_salesforce_password_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quote_and_vendo_uuid_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_workflow_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_products_pricing_model_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_users_sso_login_email_phone_key"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_saved_alert_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_notification_preferences_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_discount_rules_pkey"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_discount_rules_discount_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vacation_rule_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_shading_rules_rule_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_roles_role_name_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_quotes_customer_products_pkey"`,
    );
    await queryRunner.query(`DROP INDEX IF EXISTS "oem"."oem_products_pkey"`);
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_vendos_vendo_uuid_key"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_company_programs_channel_id_idx"`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "oem"."oem_product_hierarchy_levels_level_name_level_key"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ec94be417de8acc5a059e51aa5" ON "oem"."oem_bundles_products" ("company_id", "product_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_id_idx" ON "oem"."oem_salesforce_integrations" ("company_id", "salesforce_client_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_url_idx" ON "oem"."oem_salesforce_integrations" ("salesforce_url", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_client_secret_idx" ON "oem"."oem_salesforce_integrations" ("company_id", "salesforce_client_secret")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_username_idx" ON "oem"."oem_salesforce_integrations" ("company_id", "salesforce_username")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_salesforce_integration_salesforce_password_idx" ON "oem"."oem_salesforce_integrations" ("company_id", "salesforce_password")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" DROP CONSTRAINT IF EXISTS "UQ_bec078375a29993d3c232b6e671"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" ADD CONSTRAINT "FK_bec078375a29993d3c232b6e671" FOREIGN KEY ("address_id") REFERENCES "oem"."oem_addresses"("address_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channel_addresses" ADD CONSTRAINT "FK_e796879259096b4359cc09cbbc1" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_and_vendo_uuids" ADD CONSTRAINT "FK_1d091dd76b7dd1d2728bc248c6b" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_workflow_rules_rule_name_idx" ON "oem"."oem_workflow_rules" ("company_id", "workflow_rule_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_workflow_rules" ADD CONSTRAINT "FK_9626685ffa8340165fe40c5b015" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_addresses" ADD CONSTRAINT "FK_cfe0bcdbd1fa9de9f2f7a08fe95" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_customer_addresses" ADD CONSTRAINT "FK_c5e0fafa9da276bdfe502349e23" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_pricing_models" ADD CONSTRAINT "FK_e87a13cefe49077059dc9eba56a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_users_sso_login_email_phone_key" ON "oem"."oem_users" ("company_id", "sso_login_email", "phone")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_users" ADD CONSTRAINT "FK_95598311afd09290acc5dbaaf3a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_saved_alert_rules_rule_name_idx" ON "oem"."oem_saved_alert_rules" ("company_id", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_saved_alert_rules" ADD CONSTRAINT "FK_0f888ce595cd4ee5a65d3c1f1e8" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_notification_preferences_pkey" ON "oem"."oem_notification_preferences" ("user_id", "company_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notification_preferences" ADD CONSTRAINT "FK_86353525ec76a6bdd0d5caaa685" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_discount_rules_discount_rule_name_idx" ON "oem"."oem_discount_rules" ("company_id", "discount_rule_name")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_discount_rules_pkey" ON "oem"."oem_discount_rules" ("discount_rule_id", "company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vacation_rule_rule_name_idx" ON "oem"."oem_vacation_rules" ("company_id", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vacation_rules" ADD CONSTRAINT "FK_7b3b942111796a60a0ac2124cfb" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_shading_rules_rule_name_idx" ON "oem"."oem_shading_rules" ("company_id", "shading_rule_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_shading_rules" ADD CONSTRAINT "FK_2145b22898d173eb4baa09a693f" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_roles_role_name_idx" ON "oem"."oem_roles" ("company_id", "role_name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_roles" ADD CONSTRAINT "FK_a067e45b1d138a2d2804536952d" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_approval_queue_priorities" ADD CONSTRAINT "FK_ca8d1018341aeb51998565a81c4" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quote_approval_queues" ADD CONSTRAINT "FK_0f31c77043511f53795baedbf3a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" DROP CONSTRAINT IF EXISTS "UQ_54880fb42ae75c726aad0455b0d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_quotes" ADD CONSTRAINT "FK_0fe22bb3526f24501c6bbd50903" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_external_users" ADD CONSTRAINT "FK_7179f06982b5c3f5f24907730b8" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_products_pkey" ON "oem"."oem_products" ("product_id", "company_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_bundles_products" ADD CONSTRAINT "FK_ec94be417de8acc5a059e51aa54" FOREIGN KEY ("company_id", "product_id") REFERENCES "oem"."oem_products"("company_id","product_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_notifications" ADD CONSTRAINT "FK_25c9e6831f309eb607f22422a27" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendo_approval_queues" ADD CONSTRAINT "FK_51048a498eb46f2bb44ad77d33a" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_vendos_vendo_uuid_key" ON "oem"."oem_vendos" ("company_id", "vendo_uuid")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_vendos" ADD CONSTRAINT "FK_1e5cf2d8d1c1fb0731361dbb60f" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchies" ADD CONSTRAINT "FK_1629c814fc24d7c3b85b8f364a6" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_channels" ADD CONSTRAINT "FK_92d17119739056d2abf91f79d23" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_licensing_programs" ADD CONSTRAINT "FK_997f11267d8885b0f826e393642" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_company_programs" ADD CONSTRAINT "FK_94cd4d42abc977df4bb44485b54" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_product_hierarchy_levels_level_name_level_key" ON "oem"."oem_hierarchy_levels" ("company_id", "level_name", "hierarchy_type", "level")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_hierarchy_levels" ADD CONSTRAINT "FK_d44357927326764ec69336fa2cd" FOREIGN KEY ("company_id") REFERENCES "oem"."oem_companies"("company_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_salesforce_integration_company_id_idx" ON "oem"."oem_salesforce_integrations" ("company_id")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quote_and_vendo_uuid_pkey" ON "oem"."oem_quote_and_vendo_uuids" ("quote_and_vendo_uuid_type")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_customers_customer_email_key" ON "oem"."oem_customers" ("customer_email")`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "oem_quotes_customer_products_pkey" ON "oem"."oem_quotes_customer_products" ("quote_customer_product_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_products_pricing_model_id_idx" ON "oem"."oem_products" ("pricing_model_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "oem_company_programs_channel_id_idx" ON "oem"."oem_company_programs" ("channel_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "oem"."oem_products" ADD CONSTRAINT "FK_ad976b8b5d2898f834d4a102ee7" FOREIGN KEY ("pricing_model_id") REFERENCES "oem"."oem_pricing_models"("pricing_model_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
