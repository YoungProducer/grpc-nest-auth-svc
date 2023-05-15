/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

const envFilePath = path.resolve(process.cwd(), 'configs', 'development.env');

dotenv.config({
  path: envFilePath,
});

const entitiesNames = '*.entity{.ts,.js}';

const entitiesPath = path.resolve(__dirname, '..', 'dist', '**', entitiesNames);

const migrationsNames = '*{.ts,.js}';

const migrationsDir = path.resolve(__dirname, '..', 'src', 'migrations');

const migrationsPath = path.resolve(migrationsDir, migrationsNames);

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: +process.env.PG_EXTERNAL_PORT,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB_NAME,
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  synchronize: false,
});

module.exports = { dataSource };
