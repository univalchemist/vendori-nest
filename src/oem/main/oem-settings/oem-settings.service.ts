import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { useSeeding, runSeeder } from 'typeorm-seeding';

import { getSeedConnectionUtil } from '../../../utils/get-seed-connection.util';
import { clearDB } from '../../../utils/clear-db.util';
import { resetDBMeta } from '../../../utils/reset-db-meta.util';
import CreateOemClean from '../../seeds/clean/index.seed';
import CreateOemDemo from '../../seeds/demo/index.seed';
import { QueuesService } from '../../../shared/queues/queues.service';
import { SetCurrentTenant } from '../../../common/decorators/set-current-tenant.decorator';

@Injectable()
@SetCurrentTenant
export class OemSettingsService {
  private readonly logger = new Logger(OemSettingsService.name);

  constructor(private queuesService: QueuesService) {}

  async seedCleanDemo({
    companyId = 1,
    companyName,
    subdomain,
  }: {
    companyId: number | null;
    companyName: string;
    subdomain: string;
  }) {
    try {
      await getSeedConnectionUtil();

      await useSeeding();

      await runSeeder(
        CreateOemClean({
          companyId,
          companyName,
          subdomain,
        }),
      );
    } catch (err) {
      this.logger.error({
        func: 'settings/seedCleanDemo',
        err: err?.message || err,
      });

      // clear database to prevent zombie records
      // await clearDB();

      throw err;
    }
  }

  async seedDemo({
    companyId = 1,
    companyName,
    subdomain,
  }: {
    companyId: number | null;
    companyName: string;
    subdomain: string;
  }) {
    try {
      await getSeedConnectionUtil();

      await useSeeding();

      await runSeeder(
        CreateOemDemo({
          companyId,
          companyName,
          subdomain,
        }),
      );
    } catch (err) {
      this.logger.error({
        func: 'settings/seedDemo',
        err: err?.message || err,
      });

      // clear database to prevent zombie records
      // await clearDB();

      throw err;
    }
  }

  async resetEnv(req: Request) {
    // TODO: this task takes some time so might have timeout error on frontend
    // we need to replace it with some subscription system using graphql or websocket later

    const host = req['headers'].host || '';
    const subdomain: string = host
      .split('.')[0]
      .toString()
      .replace(/http(s|)\:\/\//, '')
      .replace('undefined', '')
      .replace(/\:\d{1,4}/, '');

    const env = process.env.NODE_ENV;

    this.logger.log({
      func: 'settings/resetEnv',
      subdomain,
      env,
      user: req['user'],
    });

    // pause all queues to prevent dead lock while truncating tables
    await this.queuesService.pauseAllQueues();

    await clearDB();

    if (env === 'demo') {
      // demo
      await this.seedDemo({
        companyId: 1,
        companyName: '1. General Demo - SFDC',
        subdomain: 'demo',
      });

      await this.seedDemo({
        companyId: 2,
        companyName: '2. Advisor Demo - SFDC',
        subdomain: 'growth',
      });

      await this.seedDemo({
        companyId: 3,
        companyName: '3. Ethan Demo - SFDC',
        subdomain: 'ethan',
      });

      await this.seedDemo({
        companyId: 4,
        companyName: '4. Brian Demo - SFDC',
        subdomain: 'brian',
      });

      await this.seedDemo({
        companyId: 5,
        companyName: '5. Phil Demo - SFDC',
        subdomain: 'phil',
      });

      await this.seedDemo({
        companyId: 6,
        companyName: '6. Beth Demo - SFDC',
        subdomain: 'beth',
      });
    } else if (env === 'staging') {
      // staging
      await this.seedDemo({
        companyId: 1,
        companyName: '1. Staging1 - SFDC',
        subdomain: 'staging',
      });

      await this.seedDemo({
        companyId: 2,
        companyName: '2. Staging2 - SFDC',
        subdomain: 'app',
      });

      await this.seedDemo({
        companyId: 3,
        companyName: '3. Vercel',
        subdomain: 'vendori-admin',
      });
    } else if (env === 'mock') {
      // to test locally
      await this.seedDemo({
        companyId: 1,
        companyName: '1. Mock1 - SFDC',
        subdomain: 'mock',
      });

      // staging
      await this.seedDemo({
        companyId: 2,
        companyName: '2. Mock2 - SFDC',
        subdomain: 'mock1',
      });
    } else if (env === 'development') {
      // to test locally
      await this.seedDemo({
        companyId: 1,
        companyName: '1. Localhost1',
        subdomain: 'localhost',
      });

      // staging
      await this.seedDemo({
        companyId: 2,
        companyName: '2. Localhost2',
        subdomain: 'localhost2',
      });
    } else if (env === 'production') {
      // production
      await this.seedDemo({
        companyId: 1,
        companyName: '1. App1',
        subdomain: 'app',
      });

      await this.seedDemo({
        companyId: 2,
        companyName: '2. App2',
        subdomain: 'oem',
      });
    }

    // For some reason after resetting the data we are getting the foreign key constraint vilolation error without this
    await resetDBMeta();

    await this.queuesService.resumeAllQueues();
  }
}
