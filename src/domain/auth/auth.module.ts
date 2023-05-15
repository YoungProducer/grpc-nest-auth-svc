import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokensModule } from '../tokens/tokens.module';
import { AuthUserEntity } from './entities/user.entity';
import { ConfirmationTokenEntity } from './entities/confirmation-token.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TokensModule,
    TypeOrmModule.forFeature([AuthUserEntity, ConfirmationTokenEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
