import { Module } from '@nestjs/common';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshModule } from './domain/tokens/refresh/refresh.module';
import { DataBaseModule } from './infrastucture/database/database.module';
import configuration from './config/configuration';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    AuthModule,
    RefreshModule,
    DataBaseModule,
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: './configs/development.env',
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty' }
            : undefined,
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
