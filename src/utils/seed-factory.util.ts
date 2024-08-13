import { Connection } from 'typeorm';

export async function seedEntities<Entity>(
  connection: Connection,
  entityClass: { new (...args: any[]): any },
  seedInputs: Partial<Entity>[],
) {
  if (seedInputs.length === 0) return [];

  // console.log(entityClass.name, seedInputs);

  // run with query builder instead of factory to override auto increment primary keys and bulk insert
  const insertResult = await connection
    .createQueryBuilder()
    .insert()
    .into(entityClass, Object.keys(seedInputs[0]))
    .values(seedInputs as any[])
    .execute();

  // const createdResults = await connection
  //   .createQueryBuilder()
  //   .from(entityClass, entityClass.name)
  //   .getMany();

  // if (insertResult.generatedMaps.length > 0) return seedInputs;
  // else return [];

  // console.log('insertResult.identifiers', insertResult.identifiers);

  for (const i in insertResult.identifiers) {
    const insert = insertResult.identifiers[i];

    if (!insert) continue;

    const key = Object.keys(insert)[0];
    seedInputs[i][key] = insert[key];
  }

  return seedInputs;
}
