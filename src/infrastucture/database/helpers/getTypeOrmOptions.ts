import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { entitiesPath, migrationsPath } from './paths';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmOptions = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: +configService.get<number>('DB_EXTERNAL_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [entitiesPath],
  migrations: [migrationsPath],
  migrationsTableName: 'migrations',
  synchronize: false,
});
