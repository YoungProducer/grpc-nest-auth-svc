import { Module } from '@nestjs/common';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RefreshModule } from './domain/tokens/refresh/refresh.module';
import { DataBaseModule } from './infrastucture/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    DataBaseModule,
    AuthModule,
    RefreshModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
