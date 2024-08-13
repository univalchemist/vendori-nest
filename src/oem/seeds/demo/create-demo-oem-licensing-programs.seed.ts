import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemLicensingProgramEntity } from '../../main/oem-licensing-programs/oem-licensing-program.entity';
import { LicensingProgramTypeEnum } from '../../main/oem-licensing-programs/oem-licensing-program.enums/licensing-program-type.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateDemoOemLicensingPrograms implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultLicensingProgram: Partial<OemLicensingProgramEntity> = {
        companyId,
        isEnabled: true,
      };

      const licensingPrograms: Partial<OemLicensingProgramEntity>[] = [
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.CUSTOMER,
          licensingProgramName: 'LicensingProgram1',
          discount: 0.1,
        },
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.RESELLER,
          licensingProgramName: 'LicensingProgram2',
          discount: 0.1,
        },
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.DISTRIBUTOR,
          licensingProgramName: 'LicensingProgram3',
          discount: 0.1,
        },
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.RESELLER,
          licensingProgramName: 'LicensingProgram4',
          discount: 0.2,
        },
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.DISTRIBUTOR,
          licensingProgramName: 'LicensingProgram5',
          discount: 0.2,
        },
        {
          ...defaultLicensingProgram,
          licensingProgramType: LicensingProgramTypeEnum.RESELLER,
          licensingProgramName: 'LicensingProgram6',
          discount: 0.3,
        },
      ];

      const licensingProgramEntities = await seedEntities(
        connection,
        OemLicensingProgramEntity,
        licensingPrograms,
      );

      return licensingProgramEntities;
    }
  };
