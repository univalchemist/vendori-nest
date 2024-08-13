import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as _ from 'lodash';

import { OemChannelEntity } from '../../main/oem-channels/oem-channel.entity';
import { OemCompanyChannelSetting } from '../../intermediaries/_oem-company-channels-settings/oem-company-channel-setting.entity';

export default (companyId = 1, channels: OemChannelEntity[]) =>
  class CreateDemoOemCompanyChannelSettings implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const emailPrefixes = ['distributor', 'reseller'];
      const companyChannelSettingEntities: OemCompanyChannelSetting[] = [];

      for (const channel of channels) {
        const companyChannelSetting: Partial<OemCompanyChannelSetting> = {
          ..._.omit(channel, ['createdAt', 'updatedAt']),
          companyId,
          contactEmail: channel.contactEmail,
        };

        const companyChannelSettingEntity = await factory(
          OemCompanyChannelSetting,
        )().create(companyChannelSetting);

        companyChannelSettingEntities.push(companyChannelSettingEntity);
      }

      return companyChannelSettingEntities;
    }
  };
