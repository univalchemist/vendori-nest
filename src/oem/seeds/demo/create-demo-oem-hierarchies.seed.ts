import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemHierarchyEntity } from '../../main/oem-hierarchies/oem-hierarchy.entity';
import { OemHierarchyLevelEntity } from '../../main/oem-hierarchy-levels/oem-hierarchy-level.entity';

import { seedEntities } from '../../../utils/seed-factory.util';
import { HierarchyTypeEnum } from '../../main/oem-hierarchy-levels/oem-hierarchy-level.enums/hierarchy-type.enum';

export default ({
  companyId = 1,
  hierarchyLevels = [],
}: {
  companyId?: number;
  hierarchyLevels: OemHierarchyLevelEntity[];
}) =>
  class CreateDemoOemHierarchies implements Seeder {
    getHierarchyLevelByName(
      hierarchyLevelName: string,
      hierarchyType: HierarchyTypeEnum = HierarchyTypeEnum.USER_GEOGRAPHY,
    ): number {
      // console.log('getHierarchyLevelByName', hierarchyLevelName);

      return hierarchyLevels.filter(
        (h) =>
          h.levelName.match(hierarchyLevelName) !== null &&
          h.hierarchyType === hierarchyType,
      )[0]?.hierarchyLevelId;
    }
    getHierarchyByName(
      hierarchies: Partial<OemHierarchyEntity>[],
      hierarchyName: string,
      hierarchyLevelId: number,
    ): number {
      // console.log( 'getHierarchyByName', hierarchyName, hierarchyLevelId, hierarchies.filter( (h) => h.hierarchyName.match(hierarchyName) !== null && h.hierarchyLevelId === hierarchyLevelId, )[0]?.hierarchyId, );

      return hierarchies.filter(
        (h) =>
          h.hierarchyName.match(hierarchyName) !== null &&
          h.hierarchyLevelId === hierarchyLevelId,
      )[0]?.hierarchyId;
    }

    public async run(factory: Factory, connection: Connection): Promise<any> {
      const defaultHeriarchy: Partial<OemHierarchyEntity> = {
        companyId,
        parentId: 1,
        isEnabled: true,
        isActive: true,
      };

      const hierarchies: Partial<OemHierarchyEntity>[] = [
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Global'),
          hierarchyName: 'Global',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'North America',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'Europe',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'Asia',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'USA',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Ukraine',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'UK',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'China',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Canada',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Germany',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'France',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Japan',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Mexico',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'North',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'East',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'England',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'East',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Scotland',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'New York',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Ohio',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'London',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Kyiv',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Berlin',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Edinburgh',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Paris',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'San Francisco',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Montreal',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Toronto',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Vancouver',
        },

        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Global',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Global ',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Hardware',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Consulting Services',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Software',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Onshore',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'OnPremise',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Computers',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Peripherals',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Near-Shore',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Off-Shore',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'SaaS',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Premium',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Standard',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Premium',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          ...defaultHeriarchy,
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Standard',
        },
      ];

      const hierarchyEntities = await seedEntities(
        connection,
        OemHierarchyEntity,
        hierarchies,
      );

      // console.log('hierarchyEntities', hierarchyEntities);

      const HierarchyToHierarchyMapping = [
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName('Global'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Global'),
          hierarchyName: 'Global',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName('Global'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'North America',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName('Global'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'Europe',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName('Global'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Continent'),
          hierarchyName: 'Asia',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'North America',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'USA',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Europe',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Ukraine',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Europe',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'UK',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Europe',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Germany',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Europe',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'France',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Asia',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'China',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Asia',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Japan',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'North America',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Canada',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'North America',
            this.getHierarchyLevelByName('Continent'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Country'),
          hierarchyName: 'Mexico',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'USA',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'East',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'USA',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'USA',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Germany',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'France',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'North',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Ukraine',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'UK',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'England',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'UK',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Scotland',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Canada',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'East',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Canada',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'Central',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Canada',
            this.getHierarchyLevelByName('Country'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('Region'),
          hierarchyName: 'West',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'East',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'New York',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Central',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Ohio',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'England',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'London',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'West',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Kyiv',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Central',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Berlin',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Scotland',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Edinburgh',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'North',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Paris',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'West',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'San Francisco',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'East',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Montreal',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Central',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Toronto',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'West',
            this.getHierarchyLevelByName('Region'),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName('City'),
          hierarchyName: 'Vancouver',
        },

        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName(
              'Global',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Hardware',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName(
              'Global',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Consulting Services',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Global',
            this.getHierarchyLevelByName(
              'Global',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-1',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Software',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Consulting Services',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Onshore',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Onshore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Near-Shore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Off-Shore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Developer (Jr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Software',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'OnPremise',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'SaaS',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Premium',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'OnPremise',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Standard',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'OnPremise',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Premium',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Hardware',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Computers',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Hardware',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Peripherals',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Consulting Services',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Near-Shore',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Consulting Services',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Off-Shore',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Software',
            this.getHierarchyLevelByName(
              'Product LV-1',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-2',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'SaaS',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Onshore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Near-Shore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'Off-Shore',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Architect (Sr.)',
        },
        {
          parentId: this.getHierarchyByName(
            hierarchyEntities,
            'SaaS',
            this.getHierarchyLevelByName(
              'Product LV-2',
              HierarchyTypeEnum.PRODUCT_LEVEL,
            ),
          ),
          hierarchyLevelId: this.getHierarchyLevelByName(
            'Product LV-3',
            HierarchyTypeEnum.PRODUCT_LEVEL,
          ),
          hierarchyName: 'Standard',
        },
      ];

      // console.log('HierarchyToHierarchyMapping', HierarchyToHierarchyMapping);

      const usedParents = [];
      for (const hierarchy of hierarchyEntities) {
        let parents = HierarchyToHierarchyMapping.filter((hh) => {
          return (
            hh.hierarchyName === hierarchy.hierarchyName &&
            hh.hierarchyLevelId === hierarchy.hierarchyLevelId
          );
        });

        if (parents.length > 1) {
          parents = parents.filter((p) => !usedParents.includes(p));

          if (!usedParents.includes(parents[0])) usedParents.push(parents[0]);
        }

        const parentId = parents[0]?.parentId;

        await connection
          .createQueryBuilder()
          .update(OemHierarchyEntity, { parentId })
          .where({ hierarchyId: hierarchy.hierarchyId })
          .execute();
      }
      // console.log('usedParents', usedParents);

      return hierarchyEntities;
    }
  };
