import { resolve } from 'node:path';

const entitiesNames = '*.entity{.ts,.js}';

export const entitiesPath = resolve(
  __dirname,
  '../../../',
  '**',
  entitiesNames,
);

const migrationsNames = '*{.ts,.js}';

export const migrationsDir = resolve(__dirname, '../../../', 'migrations');

export const migrationsPath = resolve(migrationsDir, migrationsNames);
