import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemAddressEntity } from '../../main/oem-addresses/oem-address.entity';
import { AddressTypeEnum } from '../../main/oem-addresses/oem-address.enums/address-type.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

// '1 Main Street', 'Apt. 101', '', 'Springfield', '12345', 'Georgia', 'United States', '+1 (123) 456-7890', 'info@vendori.com',

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateDemoOemAddresses implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const addresses: Partial<OemAddressEntity>[] = [
        {
          address_1: '1 Main Street',
          address_2: 'Apt. 101',
          address_3: '',
          city: 'Springfield',
          zipCode: '43922',
          region: 'Georgia',
          country: 'United States',
          phone: '+1 929 276-6530',
          email: 'info@vendori.com',
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.SHIPPING,
        },
        {
          address_1: '1 Main Street',
          address_2: 'Apt. 101',
          address_3: '',
          city: 'Springfield',
          zipCode: '50518',
          region: 'Georgia',
          country: 'United States',
          phone: '+1 929 277-3626',
          email: 'info@vendori.com',
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.BILLING,
        },
        {
          address_1: '1 Main Street',
          address_2: 'Apt. 101',
          address_3: '',
          city: 'Springfield',
          zipCode: '21200-6337',
          region: 'Georgia',
          country: 'United States',
          phone: '+1 929 279-4151',
          email: 'info@vendori.com',
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.SHIPPING,
        },
        {
          address_1: '1 Main Street',
          address_2: null,
          address_3: '',
          city: 'Springfield',
          zipCode: '97702',
          region: 'Georgia',
          country: 'United States',
          phone: '929-248-0000',
          email: null,
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.BILLING,
        },
        {
          address_1: '1 Main Street',
          address_2: null,
          address_3: '',
          city: 'Springfield',
          zipCode: '97702',
          region: 'Georgia',
          country: 'United States',
          phone: '929-248-0000',
          email: null,
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.SHIPPING,
        },
        {
          address_1: '1 Main Street',
          address_2: 'Apt. 101',
          address_3: '',
          city: 'Springfield',
          zipCode: '12345',
          region: 'Georgia',
          country: 'United States',
          phone: '+1 (123) 456-7890',
          email: 'info@vendori.com',
          isEnabled: true,
          companyId,
          addressType: AddressTypeEnum.BILLING,
        },
      ];

      const addressEntities = await seedEntities(
        connection,
        OemAddressEntity,
        addresses,
      );

      return addressEntities;
    }
  };
