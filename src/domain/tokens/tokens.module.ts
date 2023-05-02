import { Module } from '@nestjs/common';
import { JWTModule } from './jwt/jwt.module';
import { RefreshModule } from './refresh/refresh.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { TokensService } from './tokens.service';

@Module({
  imports: [
    JWTModule,
    RefreshModule,
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  providers: [TokensService],
  exports: [TokensService, JWTModule, RefreshModule],
})
export class TokensModule {}
