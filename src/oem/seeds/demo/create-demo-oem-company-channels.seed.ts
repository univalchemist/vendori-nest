import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { seedEntities } from '../../../utils/seed-factory.util';

import { OemCompanyChannel } from '../../intermediaries/_oem-company-channels/oem-company-channel.entity';
import { ChannelTypeEnum } from '../../intermediaries/_oem-company-channels/oem-company-channel.enums/channel-type.enum';
import { CompanyProgram } from '../../intermediaries/_oem-company-programs/oem-company-program.entity';
import { LicensingProgram } from '../../main/oem-licensing-programs/oem-licensing-program.entity';
import { CompanyChannelSetting } from '../../intermediaries/_oem-company-channels-settings/oem-company-channel-setting.entity';

// Please give me 6 total lines:
// Distributor #1, 2, 3
// Reseller #1, 2, 3
// Give each one a different territory and contact email (distributor1@vendori.com, etc.)
// Use vendori.com domains so we don't send externally

export default ({
  companyId = 1,
  geoHierarchyId = 1,
  companyChannelSettings = [],
  companyPrograms = [],
  licensingPrograms = [],
}: {
  companyId?: number;
  geoHierarchyId: number;
  companyChannelSettings: CompanyChannelSetting[];
  companyPrograms: CompanyProgram[];
  licensingPrograms: LicensingProgram[];
}) =>
  class CreateDemoOemCompanyChannels implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultCompanyChannel: Partial<OemCompanyChannel> = {
        companyId,
        geoHierarchyId,
        isActive: true,
        isEnabled: true,
      };

      const companyChannels: Partial<OemCompanyChannel>[] = [
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[0].companyChannelSettingId,
          companyProgramId: companyPrograms[0].companyProgramId,
          licensingProgramId: licensingPrograms[0].licensingProgramId,
          channelType: ChannelTypeEnum.RESELLER,
        },
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[1].companyChannelSettingId,
          companyProgramId: companyPrograms[1].companyProgramId,
          licensingProgramId: licensingPrograms[1].licensingProgramId,
          channelType: ChannelTypeEnum.DISTRIBUTOR,
        },
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[2].companyChannelSettingId,
          companyProgramId: companyPrograms[2].companyProgramId,
          licensingProgramId: licensingPrograms[2].licensingProgramId,
          channelType: ChannelTypeEnum.RESELLER,
        },
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[3].companyChannelSettingId,
          companyProgramId: companyPrograms[3].companyProgramId,
          licensingProgramId: licensingPrograms[3].licensingProgramId,
          channelType: ChannelTypeEnum.DISTRIBUTOR,
        },
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[4].companyChannelSettingId,
          companyProgramId: companyPrograms[4].companyProgramId,
          licensingProgramId: licensingPrograms[4].licensingProgramId,
          channelType: ChannelTypeEnum.RESELLER,
        },
        {
          ...defaultCompanyChannel,
          companyChannelSettingId:
            companyChannelSettings[5].companyChannelSettingId,
          companyProgramId: companyPrograms[5].companyProgramId,
          licensingProgramId: licensingPrograms[5].licensingProgramId,
          channelType: ChannelTypeEnum.DISTRIBUTOR,
        },
      ];

      const companyChannelEntities = await seedEntities(
        connection,
        OemCompanyChannel,
        companyChannels,
      );

      return companyChannelEntities;
    }
  };
