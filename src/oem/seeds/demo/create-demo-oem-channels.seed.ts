import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemChannelEntity } from '../../main/oem-channels/oem-channel.entity';
import { seedEntities } from '../../../utils/seed-factory.util';

export default class CreateDemoOemChannels implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const channels: Partial<OemChannelEntity>[] = [
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Reseller1',
        website: 'https://pleasant-zoo.biz',
        contactName: 'Emery',
        contactEmail: 'reseller1@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Distributor1',
        website: 'https://everlasting-honey.biz',
        contactName: 'Travon',
        contactEmail: 'distributor1@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Reseller2',
        website: 'https://white-apple.net',
        contactName: 'Marina',
        contactEmail: 'reseller2@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Distributor2',
        website: 'https://abandoned-transition.com',
        contactName: 'Jaleel',
        contactEmail: 'distributor2@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Reseller3',
        website: 'https://tidy-jewel.net',
        contactName: 'Duane',
        contactEmail: 'reseller3@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
      {
        logoUrl: 'https://demo.vendori.com/images/default-company-logo.png',
        name: 'Distributor3',
        website: 'https://webbed-octave.com',
        contactName: 'Kristopher',
        contactEmail: 'distributor3@vendori.com',
        contactPhone: '+1 (123) 456-7890',
        isActive: true,
        isEnabled: true,
      },
    ];

    const channelEntities = await seedEntities(
      connection,
      OemChannelEntity,
      channels,
    );

    return channelEntities;
  }
}
