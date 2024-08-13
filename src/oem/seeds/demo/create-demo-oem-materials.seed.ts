import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OemMaterialEntity } from '../../main/oem-materials/oem-material.entity';
import { PackagePositionEnum } from '../../main/oem-materials/oem-material.enums/package-position.enum';
import { ApplicableToEnum } from '../../main/oem-materials/oem-material.enums/applicable-to.enum';
import { seedEntities } from '../../../utils/seed-factory.util';

export default ({ companyId = 1 }: { companyId?: number }) =>
  class CreateDemoOemMaterials implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
      const materials: Partial<OemMaterialEntity>[] = [
        {
          companyId,
          materialName: 'Vertical Cover',
          fileUrl:
            'https://files.vendori.com/pdf/295dd5ec-3bcb-41e6-8e74-c30b21ca6599.pdf?Expires=1718289447&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvMjk1ZGQ1ZWMtM2JjYi00MWU2LThlNzQtYzMwYjIxY2E2NTk5LnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODI4OTQ0N319fV19&Signature=NuRpwvf8vi4dIxaC4VaYWEu1agKbsNGOAKcRBcBVmtcVqyQPClRYms9jxcy~eG4sIVgGXIip1PcWlowdVMBRGpn3nnDxgldrs1Uq9~rcYEWR-BFjlEWlEpGnnHkLSTtIEiz0-Ej086SfzqX3~JLXU-ipCM-d-D61vN1yETpmsslEfG-1UYaTtTsiOwI9VJuvr1LvLpgekWZSO5yV68RXDSU6ztNs3wC-AW1r8n5GQ~ErPnIGO7E4yn2Hk-tTo0wHICRcbSP~kji~046iaPhJilSZ6gZWHH4mNJ213tm0DA3Y2JRxOdsWosht9pHOBViBHwmvBmzHe5JlL7uZGi1QWg__&Key-Pair-Id=K3W4UV0J4B6YE7',
          // 'https://demo.vendori.com/materials/vertical-demo.pdf',
          isRequired: false,
          isEnabled: true,
          applicableTo: ApplicableToEnum.BOTH,
          packagePosition: PackagePositionEnum.BEFORE,
        },
        {
          companyId,
          materialName: 'Horizontal Cover',
          fileUrl:
            'https://files.vendori.com/pdf/1769ecd6-ed2f-450a-8129-f90a93f24b79.pdf?Expires=1718289464&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvMTc2OWVjZDYtZWQyZi00NTBhLTgxMjktZjkwYTkzZjI0Yjc5LnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODI4OTQ2NH19fV19&Signature=qQlQ0tX2hXR7NtCkqKLk8aidIE2cnQn2bF181-5FqfKsQqgOMA2Jl4hNF~QMMYxRYxFA9UeGBrOPYwes~aVbQki7nZYEm3LQjbG32hdnEvlfBaTa4BYDsDxtNdQ~bEdfmgRHyB4kqkr3l~7jFB7z2~S6qgK2p2U7DsRTknZx7D8G5N2zyKzzKjkMML3g-cRh~LXr2zv1vb5AqhqC1GF2aMhoMyFly1z8yedsZlvSLS3MeFHg8jsZg7ecyj5WBjmRc~Uq0GCx9rayUJJf8-Hk-ZTuASlnBGe7eMJWcCW8SPpLJfOj-AiD23fd0VcKZE6Ov6D4J3heWNc3lViAuADHuQ__&Key-Pair-Id=K3W4UV0J4B6YE7',
          // 'https://demo.vendori.com/materials/horizontal-demo.pdf',
          isRequired: false,
          isEnabled: true,
          applicableTo: ApplicableToEnum.BOTH,
          packagePosition: PackagePositionEnum.BEFORE,
        },
        {
          companyId,
          materialName: 'Terms of Service',
          fileUrl:
            'https://files.vendori.com/pdf/d7de92d7-5367-4dbf-a957-e9b94feb6ce2.pdf?Expires=1718289478&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvZDdkZTkyZDctNTM2Ny00ZGJmLWE5NTctZTliOTRmZWI2Y2UyLnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODI4OTQ3OH19fV19&Signature=NohYUJUrXPrBDT4UJoJRj2j7EntqhfTGOcgYaq0PFCXRvZptCix3ijpNpPEfhDdNcmk2iQgxHdeGJUx69eSRbX9HmUmSG6SDGLrqaWewbF7F9XTY0CLrZIqO5BzdZoAaAJ6Jxyhg7NdvnyDJNNd69rcarMFjczJF9KiH3rd6PqDdh9nI-o7sTSJmmEps3~Z~XElb~UpJnUWG5MPh3meL7-XO9rfhRQNo7vc67QEHfYuXbIU4yk1GkGTST-6PAxQblHRflwmbSi7BPOlXVz9q5r4sVFBKl9ffI9zVH3d3SIT5yclbD29sk27RTuVHI5WHXi8bvCxMiGkq2pDK9HslpA__&Key-Pair-Id=K3W4UV0J4B6YE7',
          // 'https://demo.vendori.com/materials/tos.pdf',
          isRequired: false,
          isEnabled: true,
          applicableTo: ApplicableToEnum.BOTH,
          packagePosition: PackagePositionEnum.OPTIONAL,
        },
        {
          companyId,
          materialName: 'Company History',
          fileUrl:
            'https://files.vendori.com/pdf/ed56210c-a32b-411a-93b4-9aa73f96c923.pdf?Expires=1718289471&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9maWxlcy52ZW5kb3JpLmNvbS9wZGYvZWQ1NjIxMGMtYTMyYi00MTFhLTkzYjQtOWFhNzNmOTZjOTIzLnBkZiIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTcxODI4OTQ3MX19fV19&Signature=XqoZlxJAW-eoF-n~qqT6LpMIsys1diyMUq4nRETN7z5Of7mujkcoZK8wePBIPpFGSbFEaDpaZZ~UdSeewHUOwXnkAVHU45Y2EvmejP0Zg2iWkk9qRbRTW6pgIRZYrKDmzA09tMrwchTYmfLSOai779UoYt9c2ZiewMUwluTvTeqKirq9kJdQRFTN9biy03CQ6kykw-ZVPTc2wgkL4YVoFMEFeOEK3L4Ouga4ML9jB7TOshjAekaXr8NW-whFE9V7IYTsCqSvbuTNtYkfmACGD4wDwwmHgXyvIosfQugsBtd88mKUZYHUjXSojuZpGevUIkTxfa3XH-hjm8Rz44YszQ__&Key-Pair-Id=K3W4UV0J4B6YE7',
          // 'https://demo.vendori.com/materials/company-history.pdf',
          isRequired: false,
          isEnabled: true,
          applicableTo: ApplicableToEnum.BOTH,
          packagePosition: PackagePositionEnum.OPTIONAL,
        },
      ];

      const materialEntities = await seedEntities(
        connection,
        OemMaterialEntity,
        materials,
      );

      return materialEntities;
    }
  };
