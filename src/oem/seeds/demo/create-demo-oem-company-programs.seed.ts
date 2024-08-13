import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemCompanyProgram } from '../../intermediaries/_oem-company-programs/oem-company-program.entity';
import { seedEntities } from '../../../utils/seed-factory.util';
import { ChannelEntity } from '../../main/oem-channels/oem-channel.entity';

export default ({
  companyId = 1,
  channels = [],
}: {
  companyId?: number;
  channels: ChannelEntity[];
}) =>
  class CreateDemoOemCompanyPrograms implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultCompanyProgram: Partial<OemCompanyProgram> = {
        companyId,
        name: 'NA',
        isEnabled: true,
      };

      const companyPrograms: Partial<OemCompanyProgram>[] = [
        {
          ...defaultCompanyProgram,
          channelId: channels[0].channelId,
        },
        {
          ...defaultCompanyProgram,
          channelId: channels[1].channelId,
        },
        {
          ...defaultCompanyProgram,
          channelId: channels[2].channelId,
        },
        {
          ...defaultCompanyProgram,
          channelId: channels[3].channelId,
        },
        {
          ...defaultCompanyProgram,
          channelId: channels[4].channelId,
        },
        {
          ...defaultCompanyProgram,
          channelId: channels[5].channelId,
        },
      ];

      const companyProgramEntities = await seedEntities(
        connection,
        OemCompanyProgram,
        companyPrograms,
      );

      return companyProgramEntities;
    }
  };
