import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { AuthUserEntity } from 'src/domain/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUserEntity, RefreshTokenEntity])],
  providers: [RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
