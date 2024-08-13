import { Factory, runSeeder, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import CreateDemoOemHierarchyLevels from './create-demo-oem-hierarchy-levels.seed';
import CreateDemoOemHierarchies from './create-demo-oem-hierarchies.seed';
import CreateDemoOemCompanies from './create-demo-oem-companies.seed';
import CreateDemoOemChannels from './create-demo-oem-channels.seed';
import CreateDemoOemCompanyPrograms from './create-demo-oem-company-programs.seed';
import CreateDemoOemLicensingPrograms from './create-demo-oem-licensing-programs.seed';
import CreateDemoOemCompanyChannelSettings from './create-demo-oem-company-channel-settings.seed';
import CreateDemoOemCompanyChannels from './create-demo-oem-company-channels.seed';
import CreateDemoOemRoles from './create-demo-oem-roles.seed';
import CreateDemoOemUsers from './create-demo-oem-users.seed';
import CreateDemoOemAddresses from './create-demo-oem-addresses.seed';
import CreateDemoOemCompanyAddresses from './create-demo-oem-company-addresses.seed';
import CreateDemoOemWorkflowRules from './create-demo-oem-workflow-rules.seed';
import CreateDemoOemVisibleProductFields from './create-demo-oem-visible-product-fields.seed';
import CreateDemoOemMaterials from './create-demo-oem-materials.seed';
import CreateDemoOemDiscountRules from './create-demo-oem-discount-rules.seed';
import CreateDemoOemDiscounts from './create-demo-oem-discounts.seed';
import CreateDemoOemPricingModels from './create-demo-oem-pricing-models.seed';
import CreateDemoOemUnitTiers from './create-demo-oem-unit-tiers.seed';
import CreateDemoOemProducts from './create-demo-oem-products.seed';
import CreateDemoOemPriceTiers from './create-demo-oem-price-tiers.seed';
import CreateDemoOemShadingRulesSeed from './create-demo-oem-shading-rules.seed';
import CreateDemoOemCustomers from './create-demo-oem-customers.seed';
import CreateDemoOemCustomerAddresses from './create-demo-oem-customer-addresses.seed';
import CreateDemoOemCustomerProducts from './create-demo-oem-customer-products.seed';
import CreateDemoOemApprovalQueuePriorities from './create-demo-oem-approval-queue-priorities.seed';
import CreateDemoOemQuotes from './create-demo-oem-quotes.seed';
import CreateDemoOemQuoteAndVendoUuids from './create-demo-oem-quote-and-vendo-uuids.seed';
import CreateDemoOemQuoteUsers from './create-demo-oem-quote-users.seed';
import CreateDemoOemQuoteApprovalQueues from './create-demo-oem-quote-approval-queues.seed';
import CreateDemoOemContacts from './create-demo-oem-contacts.seed';
import CreateDemoOemQuoteContacts from './create-demo-oem-quote-contacts.seed';
import CreateDemoOemQuoteCustomerProducts from './create-demo-oem-quote-customer-products.seed';
import CreateDemoOemQuoteMaterials from './create-demo-oem-quote-materials.seed';
import CreateDemoOemQuoteProducts from './create-demo-oem-quote-products.seed';

import { OemHierarchyEntity } from '../../main/oem-hierarchies/oem-hierarchy.entity';
import { HierarchyTypeEnum } from '../../main/oem-hierarchy-levels/oem-hierarchy-level.enums/hierarchy-type.enum';
import { OemChannelEntity } from '../../main/oem-channels/oem-channel.entity';
import { NODE_ENV } from '../../../environments';

function toCamelCase(str) {
  if (!str) str = '';

  return str.toString().replace(/_([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

// TODO: import csv directly and apply necessary transformations
export default ({
  companyId = 1,
  companyName = 'Demo & Co.',
  subdomain = 'demo',
}: {
  companyId?: number;
  companyName?: string;
  subdomain?: string;
}) =>
  class CreateOemDemo implements Seeder {
    async seedGeoHierarchies(): Promise<any> {
      const hierarchyLevels = await runSeeder(
        CreateDemoOemHierarchyLevels({ companyId }),
      );
      const productHierarchyLevels = hierarchyLevels.filter(
        (hl) => hl.hierarchyType === HierarchyTypeEnum.PRODUCT_LEVEL,
      );
      const geoHierarchyLevels = hierarchyLevels.filter(
        (hl) => hl.hierarchyType === HierarchyTypeEnum.USER_GEOGRAPHY,
      );

      const hierarchies = await runSeeder(
        CreateDemoOemHierarchies({ companyId, hierarchyLevels }),
      );
      const geoHierarchies = hierarchies.filter((h) =>
        geoHierarchyLevels
          .flatMap((hl) => hl.hierarchyLevelId)
          .includes(h.hierarchyLevelId),
      );
      const productHierarchies = hierarchies.filter((h) =>
        productHierarchyLevels
          .flatMap((hl) => hl.hierarchyLevelId)
          .includes(h.hierarchyLevelId),
      );

      return {
        hierarchyLevels,
        hierarchies,
        geoHierarchies,
        productHierarchies,
      };
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const { company } = await runSeeder(
        CreateDemoOemCompanies({
          companyId,
          companyName,
          subdomain,
        }),
      );
      const materials = await runSeeder(CreateDemoOemMaterials({ companyId }));
      const addresses = await runSeeder(CreateDemoOemAddresses({ companyId }));
      const companyAddress = await runSeeder(
        CreateDemoOemCompanyAddresses({ companyId }),
      );

      const {
        hierarchyLevels,
        hierarchies,
        geoHierarchies,
        productHierarchies,
      } = await this.seedGeoHierarchies();

      const roles = await runSeeder(CreateDemoOemRoles({ companyId }));
      const users = await runSeeder(
        CreateDemoOemUsers({
          companyId,
          subdomain,
          roles,
          hierarchies: geoHierarchies,
        }),
      );

      const existingChannels = await connection
        .createQueryBuilder()
        .from(OemChannelEntity, 'oem_channels')
        .getRawAndEntities();

      const channels =
        companyId === 1
          ? await runSeeder(CreateDemoOemChannels)
          : existingChannels.raw.map((o) => {
              const convertedObj = {};

              for (const k in o)
                if (Object.prototype.hasOwnProperty.call(o, k)) {
                  const convertedKey = toCamelCase(k);
                  convertedObj[convertedKey] = o[k];
                }

              return convertedObj;
            });

      const companyPrograms = await runSeeder(
        CreateDemoOemCompanyPrograms({ companyId, channels }),
      );
      const licensingPrograms = await runSeeder(
        CreateDemoOemLicensingPrograms({ companyId }),
      );
      const companyChannelSettings = await runSeeder(
        CreateDemoOemCompanyChannelSettings(companyId, channels),
      );
      const companyChannels = await runSeeder(
        CreateDemoOemCompanyChannels({
          companyId,
          geoHierarchyId: geoHierarchies[0].geoHierarchyId,
          companyChannelSettings,
          companyPrograms,
          licensingPrograms,
        }),
      );

      const visibleProductFields = await runSeeder(
        CreateDemoOemVisibleProductFields({ companyId }),
      );

      const pricingModels = await runSeeder(
        CreateDemoOemPricingModels({ companyId }),
      );
      const unitTiers = await runSeeder(
        CreateDemoOemUnitTiers({ companyId, pricingModels }),
      );
      const products = await runSeeder(
        CreateDemoOemProducts({
          companyId,
          pricingModels,
          hierarchies: productHierarchies,
          ownerUserId: users[0].userId,
        }),
      );
      const priceTiers = await runSeeder(
        CreateDemoOemPriceTiers({ companyId, unitTiers, products }),
      );

      const shadingRules = await runSeeder(
        CreateDemoOemShadingRulesSeed({ companyId, users }),
      );
      const workflowRules = await runSeeder(
        CreateDemoOemWorkflowRules({ companyId, users, products }),
      );
      // const discountRules = await runSeeder(
      //   CreateDemoOemDiscountRules({ companyId }),
      // );
      const discounts = await runSeeder(CreateDemoOemDiscounts({ companyId }));

      // const customers = await runSeeder(CreateDemoOemCustomers({ companyId }));
      // const customerAddresses = await runSeeder(
      //   CreateDemoOemCustomerAddresses({ companyId }),
      // );
      // const customerProducts = await runSeeder(
      //   CreateDemoOemCustomerProducts({ companyId }),
      // );

      const approvalQueuePriorities = await runSeeder(
        CreateDemoOemApprovalQueuePriorities({ companyId, roles }),
      );
      // const quotes = await runSeeder(CreateDemoOemQuotes({ companyId }));
      const quoteAndVendoUuids = await runSeeder(
        CreateDemoOemQuoteAndVendoUuids({ companyId }),
      );
      // const quoteUsers = await runSeeder(
      //   CreateDemoOemQuoteUsers({ companyId }),
      // );
      // const quoteApprovalQueues = await runSeeder(
      //   CreateDemoOemQuoteApprovalQueues({ companyId }),
      // );
      // const contacts = await runSeeder(CreateDemoOemContacts({ companyId }));
      // const quoteContacts = await runSeeder(
      //   CreateDemoOemQuoteContacts({ companyId }),
      // );
      // const quoteCustomerProducts = await runSeeder(
      //   CreateDemoOemQuoteCustomerProducts({ companyId }),
      // );
      // const quoteMaterials = await runSeeder(
      //   CreateDemoOemQuoteMaterials({ companyId }),
      // );
      // const quoteProducts = await runSeeder(
      //   CreateDemoOemQuoteProducts({ companyId }),
      // );

      const queryRunner = connection.createQueryRunner();

      await queryRunner.manager.query(
        `
        insert into oem.oem_salesforce_integrations (company_id, salesforce_url, salesforce_client_id, salesforce_client_secret, salesforce_username, salesforce_password, is_enabled, settings)
        values  (${companyId},
          'https://vendoriinc--${
            NODE_ENV === 'staging' ? 'dev1' : 'qa1'
          }.sandbox.my.salesforce.com',
          '${
            NODE_ENV === 'staging'
              ? '3MVG9ojmGst1I5HNLfHB.7VjlzwZ68sDjt_HvvjiZiNtjaM8GumLnrcMpvyKsmnwWA8tJLj3.dBPFKEKJHYnv'
              : '3MVG9sVI3Fa3A7wB6h.0kKVvZ3bCHR.g9NoBbHOl9KD.gUqjaeAWePE_0jEhnuzOMxkJSbBn0TlYrn.ounQNJ'
          }',
          '${
            NODE_ENV === 'staging'
              ? '2F7465DC218BAD573C544913DABB124219BCBDFAB03EAE48A09CF30B10E3DEAF'
              : '291CD9EBF526DB358F6BF902636F0F83D4E8DFE54752A4CD2FC2AA7BF85043BC'
          }',
          '${
            NODE_ENV === 'staging'
              ? 'vendoriapi@vendori.com.staging'
              : 'vendoriapi@vendori.com.mock'
          }',
          '_jmcZ3!q2LNvHP-n.w',
          true, '{}'
        );

        insert into oem.oem_roles_visible_product_fields (company_id, role_id, visible_product_field_id, created_at, updated_at, is_enabled)
        values
          (
            ${companyId}, ${roles[0].roleId},
            ${
              visibleProductFields[0].visibleProductFieldId
            }, NOW(), NOW(), true),
          (
            ${companyId}, ${roles[2].roleId},
            ${
              visibleProductFields[0].visibleProductFieldId
            }, NOW(), NOW(), true),
          (
            ${companyId}, ${roles[3].roleId},
            ${
              visibleProductFields[0].visibleProductFieldId
            }, NOW(), NOW(), true),
          (
            ${companyId}, ${roles[5].roleId},
            ${visibleProductFields[0].visibleProductFieldId}, NOW(), NOW(), true
          );

          insert into oem.oem_bundles_products (company_id, product_id, bundle_id)
          values
            (${companyId}, ${products[14].productId}, ${products[4].productId}),
            (${companyId}, ${products[14].productId}, ${products[5].productId}),
            (${companyId}, ${products[15].productId}, ${products[1].productId}),
            (${companyId}, ${products[15].productId}, ${products[2].productId});

          insert into oem.oem_products_relationships (company_id,  source_product_id, target_product_id, relationship_type, eligible_type, list_price_type, is_enabled, is_active, created_at, updated_at)
          values
            (
              ${companyId}, ${products[1].productId},
              ${
                products[2].productId
              }, 'Add On', 'Addon', 'Full List Price', true, true, NOW(), NOW()),
            (
              ${companyId}, ${products[5].productId},
              ${
                products[6].productId
              }, 'Transition', 'Upgrade', 'Full List Price', true, true, NOW(), NOW()),
            (
              ${companyId}, ${products[0].productId},
              ${
                products[13].productId
              }, 'Transition', 'Upgrade', 'Full List Price', true, true, NOW(), NOW());
        `.replace(/\s+/g, ' '),
      );

      const result = {
        company,
        addresses,
        companyAddress,
        geoHierarchies,
        roles,
        users,
        channels,
        companyPrograms,
        licensingPrograms,
        companyChannelSettings,
        companyChannels,
        workflowRules,
        visibleProductFields,
        materials,
        // discountRules,
        discounts,
        pricingModels,
        unitTiers,
        products,
        priceTiers,
        shadingRules,
        // customers,
        // customerAddresses,
        // customerProducts,
        approvalQueuePriorities,
        // quotes,
        quoteAndVendoUuids,
        // quoteUsers,
        // quoteApprovalQueues,
        // contacts,
        // quoteContacts,
        // quoteCustomerProducts,
        // quoteMaterials,
        // quoteProducts,
      };

      // Log the result whenever we reset data for the next few deployments.
      // console.log('result', result);

      return result;
    }
  };
