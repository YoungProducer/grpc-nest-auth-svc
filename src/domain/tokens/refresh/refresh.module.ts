import { Module } from '@nestjs/common';
import { RefreshService } from './refresh.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { UserEntity } from 'src/domain/auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity])],
  providers: [RefreshService],
  exports: [RefreshService],
})
export class RefreshModule {}
