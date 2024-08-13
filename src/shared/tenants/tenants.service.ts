import { BadGatewayException, Injectable, Logger, Scope } from '@nestjs/common';
import { get } from 'async-local-storage';

import { ILike, QueryRunner, Repository } from 'typeorm';
import { Tenant } from './tenant';

import { DB_MAIN_DATABASE as DB_NAME, NODE_ENV } from '../../environments';
import { OemCompanyEntity } from '../../oem/main/oem-companies/oem-company.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * We use async-local-storage instead of tenant factory bc of major performance.
 * But in future might be need to use another approach. If current wouldn't support.
 */

@Injectable()
export class TenantsService {
  private readonly logger = new Logger(TenantsService.name);

  //TODO: master connection should be in import
  constructor(
    @InjectRepository(OemCompanyEntity, 'MASTER_CONNECTION')
    private companyRepo: Repository<OemCompanyEntity>,
  ) {}

  async getTenantByName(tenantName: string): Promise<Tenant> {
    const subdomainOrCompanyId = tenantName
      ?.toLowerCase()
      .replace(/api-/, '')
      .replace(/-oem/, '');

    const company = await this.companyRepo.findOne({
      where: [
        { subdomain: subdomainOrCompanyId || NODE_ENV, isEnabled: true },
        // ...(parseInt(subdomainOrCompanyId) > 0
        //   ? [
        //       {
        //         companyId: subdomainOrCompanyId || NODE_ENV,
        //         isEnabled: true,
        //       },
        //     ]
        //   : []),
      ],
      order: { companyId: 'DESC' },
    });

    // this.logger.debug({
    //   func: `${TenantsService.name}/getTenantByName`,
    //   company: {
    //     id: company.companyId,
    //     name: company.companyName,
    //     subdomain: company.subdomain,
    //   },
    //   message: `company from ${subdomain} with current subdomain`,
    // });

    if (!company)
      throw new BadGatewayException(
        `There is no company that matches ${subdomainOrCompanyId}`,
      );

    return {
      name: company.companyName.toLowerCase(),
      tenantId: company.companyId,
    };
  }

  async getTenant(): Promise<string> {
    const tenant: string = await get('tenant');
    return tenant;
  }

  async getTenantFromNamespace(): Promise<Tenant> {
    const tenant: string = await this.getTenant();

    // this.logger.debug({
    //   func: `${TenantsService.name}/getTenant`,
    //   tenant: tenant,
    //   message: 'tenant name from async-local-storage',
    // });

    const res = await this.getTenantByName(tenant);

    // this.logger.debug({
    //   func: `${TenantsService.name}/getTenantFromNamespace`,
    //   company: res,
    //   message: 'company with current subdomain',
    // });

    return { ...res, name: tenant };
  }

  async setCurrentTenantOnRepository<T>(
    repository: Repository<T>,
  ): Promise<void> {
    try {
      const tenantId = (await this.getTenantFromNamespace()).tenantId;

      if (!tenantId) {
        new BadGatewayException('Cannot get tenantId');
      }

      await repository.query(
        `SET SESSION ${DB_NAME}.current_tenant=${tenantId};`,
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadGatewayException(e);
    }
  }

  public async setCurrentTenantOnQueryRunner(
    queryRunner: QueryRunner,
    tenantId?: number,
  ): Promise<void> {
    try {
      tenantId = tenantId || (await this.getTenantFromNamespace()).tenantId;

      if (!tenantId) {
        new BadGatewayException('Cannot get tenantId');
      }

      await queryRunner.query(
        `SET SESSION ${DB_NAME}.current_tenant=${tenantId};`,
        [],
      );
    } catch (e) {
      this.logger.error(e);
      throw new BadGatewayException(e);
    }
  }
}
