import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { OemHierarchyLevelEntity } from '../../main/oem-hierarchy-levels/oem-hierarchy-level.entity';
import { HierarchyTypeEnum } from '../../main/oem-hierarchy-levels/oem-hierarchy-level.enums/hierarchy-type.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateOemHierarchyLevels implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultHeriarchyLevel: Partial<OemHierarchyLevelEntity> = {
        companyId,
        hierarchyType: HierarchyTypeEnum.USER_GEOGRAPHY,
        isEditable: true,
        isEnabled: true,
        isActive: true,
        isGlobal: false,
      };

      const hierarchyLevels: Partial<OemHierarchyLevelEntity>[] = [
        {
          ...defaultHeriarchyLevel,
          levelName: 'Global',
          level: 0,
          isGlobal: true,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Continent',
          level: 1,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Country',
          level: 2,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Region',
          level: 3,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'City',
          level: 4,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'District',
          level: 5,
          isActive: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Geo LV-6',
          level: 6,
          isActive: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Geo LV-7',
          level: 7,
          isActive: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Geo LV-8',
          level: 8,
          isActive: false,
        },

        {
          ...defaultHeriarchyLevel,
          levelName: 'Global',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 0,
          isGlobal: true,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-1',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 1,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-2',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 2,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-3',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 3,
          isEditable: false,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-4',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 4,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-5',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 5,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-6',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 6,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-7',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 7,
        },
        {
          ...defaultHeriarchyLevel,
          levelName: 'Product LV-8',
          hierarchyType: HierarchyTypeEnum.PRODUCT_LEVEL,
          level: 8,
          isActive: false,
        },
      ];

      const hierarchyLevelEntities = await seedEntities(
        connection,
        OemHierarchyLevelEntity,
        hierarchyLevels,
      );

      return hierarchyLevelEntities;
    }
  };
