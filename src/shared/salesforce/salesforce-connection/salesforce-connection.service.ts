import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OemSalesforceIntegrationEntity } from '../../../oem/main/oem-integrations/oem-salesforce-integrations/oem-salesforce-integration.entity';
import { Connection } from 'jsforce';
import { Repository } from 'typeorm';
import { ConnectType, TConnectionPool } from './types';
import {
  ISalesforceTokenObject,
  ISalesforceTokenParams,
} from '../salesforce.types/salesforce.oauth2-token.type';
import { SALESFORCE_LOGIN_URI } from '../../../environments'; //TODO: we should move every configuration to module
import moment from 'moment';

@Injectable()
export class SalesforceConnectionService {
  private connectionsPool: Array<TConnectionPool>;

  constructor(
    @InjectRepository(OemSalesforceIntegrationEntity)
    private salesforceRepo: Repository<OemSalesforceIntegrationEntity>,
    @Inject(Logger)
    private readonly logger: Logger,
  ) {}

  public async initConnections() {
    try {
      this.logger.log(`[Salesforce] initializing connections...`);

      const accountsSF = await this.fetchAccountsSF();

      this.connectionsPool = [];

      for (const accountSF of accountsSF) {
        await this.connect({
          companyId: accountSF.companyId,
          clientIdSF: accountSF.salesforceClientId,
          clientSecretSF: accountSF.salesforceClientSecret,
          usernameSF: accountSF.salesforceUsername,
          passwordSF: accountSF.salesforcePassword,
        });
      }

      this.logger.log(`[Salesforce] initialized connections!`);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to initialize salesforce connections',
      );
    }
  }

  public getAllConnections(): Array<TConnectionPool> {
    return this.connectionsPool;
  }

  private async fetchAccountsSF() {
    try {
      return await this.salesforceRepo.find();
    } catch {
      throw new InternalServerErrorException(
        'Failed to fetch from the database',
      );
    }
  }

  private async fetchAccountSF(companyId: number) {
    try {
      return await this.salesforceRepo.findOne({ where: { companyId } });
    } catch {
      throw new InternalServerErrorException(
        'Failed to fetch from the database',
      );
    }
  }

  private async connect({
    clientIdSF,
    clientSecretSF,
    companyId,
    passwordSF,
    usernameSF,
  }: ConnectType) {
    const connection = new Connection({
      oauth2: {
        loginUrl: SALESFORCE_LOGIN_URI,
        clientId:
          '3MVG9ojmGst1I5HNLfHB.7VjlzwZ68sDjt_HvvjiZiNtjaM8GumLnrcMpvyKsmnwWA8tJLj3.dBPFKEKJHYnv',
        clientSecret:
          '2F7465DC218BAD573C544913DABB124219BCBDFAB03EAE48A09CF30B10E3DEAF',
      },
    });

    try {
      await connection.login(usernameSF, passwordSF);
      this.connectionsPool.push({ companyId, connection });
      return connection;
    } catch (error) {
      this._loginConnectionErrorSF(error);
    }
  }

  public async getConnection(companyId: number | string) {
    companyId = Number(companyId);

    const connectionIndex = this.connectionsPool.findIndex(
      (conn) => conn.companyId === companyId,
    );

    if (
      connectionIndex !== -1 &&
      this.connectionsPool[connectionIndex].connection.userInfo
    ) {
      return this.connectionsPool[connectionIndex].connection;
    }

    if (connectionIndex !== -1) {
      await this.remove(companyId);
    }

    try {
      return await this.add(companyId);
    } catch (error) {
      throw new NotFoundException(
        `Connection not found for companyId ${companyId}`,
      );
    }
  }

  public async refreshTokenSF(companyId) {
    try {
      return this.getTokenObjectSF(companyId);
    } catch (error) {
      throw error;
    }
  }

  public async getTokenObjectSF(companyId) {
    try {
      const { accessToken, instanceUrl } = await this.getConnection(companyId);

      if (!accessToken) {
        this._loginConnectionErrorSF();
      }

      return this._transformOauthTokenSF({
        accessToken,
        instanceUrl,
      });
    } catch (error) {
      throw error;
    }
  }

  public async _isRateLimitReachedSF(companyId) {
    try {
      const connection = await this.getConnection(companyId);

      if (connection.limitInfo && connection.limitInfo.apiUsage) {
        const { limit, used } = connection.limitInfo.apiUsage;

        if (limit - used === 0) {
          this.logger.error({
            func: `${SalesforceConnectionService.name}/${this._isRateLimitReachedSF.name}`,
            error: 'Rate limit is reached.',
          });
        }
        throw new ForbiddenException('Salesforce Error: API Timed out.');
      }
    } catch (error) {}
  }

  private _loginConnectionErrorSF(error?: Error) {
    this.logger.error({
      func: SalesforceConnectionService.name,
      error,
    });
  }

  public async add(companyId: number) {
    try {
      const accountSF = await this.fetchAccountSF(companyId);
      return await this.connect({
        clientIdSF: accountSF.salesforceClientId,
        clientSecretSF: accountSF.salesforceClientSecret,
        companyId: companyId,
        passwordSF: accountSF.salesforcePassword,
        usernameSF: accountSF.salesforcePassword,
      });
    } catch (error) {
      throw error;
    }
  }

  private _transformOauthTokenSF(
    tokenParams: ISalesforceTokenParams,
  ): ISalesforceTokenObject {
    const { accessToken, instanceUrl } = tokenParams;

    return {
      token: accessToken,
      instanceUrl,
      issuedAt: moment().utc().toDate(),
    };
  }

  public async remove(companyId: number) {
    const connection = this.connectionsPool.find(
      (conn) => conn.companyId === companyId,
    );

    if (connection) {
      try {
        await connection.connection.logout();
        this.connectionsPool = this.connectionsPool.filter(
          (connection) => connection.companyId !== companyId,
        );
      } catch (error) {
        throw error;
      }
    }
  }
}
