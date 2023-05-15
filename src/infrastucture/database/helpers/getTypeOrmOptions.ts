import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { entitiesPath, migrationsPath } from './paths';
import { ConfigService } from '@nestjs/config';
import { PostgreConfig } from 'src/config/configuration';

export const getTypeOrmOptions = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  ...config.get<PostgreConfig>('postgre'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  synchronize: false,
});
