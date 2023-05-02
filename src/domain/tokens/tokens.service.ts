import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { JWTService } from './jwt/jwt.service';
import { RefreshService } from './refresh/refresh.service';
import { UserDto } from 'src/domain/auth/dto/user.dto';
import { SignOptions } from './jwt/interfaces/sign-options.interface';
import { instanceToPlain } from 'class-transformer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokensService {
  constructor(
    private configService: ConfigService,

    private jwtService: JWTService,

    private refreshService: RefreshService,

    @InjectRepository(RefreshTokenEntity)
    private refreshTokensRepository: Repository<RefreshTokenEntity>,
  ) {}

  public async issueTokensPair(user: UserDto): Promise<[string, string]> {
    const options: SignOptions = {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      secret: this.configService.get<string>('JWT_SECRET'),
    };

    const accessToken = await this.jwtService.signToken(user, options);
    const refreshToken = await this.refreshService.create(user.id);

    return [`Bearer ${accessToken}`, refreshToken];
  }

  public async refresh(token: string): Promise<[string, string]> {
    const tokenEntity = await this.refreshService.validate(token);

    const tokensPair = await this.issueTokensPair(
      instanceToPlain(tokenEntity.user) as UserDto,
    );

    await this.refreshTokensRepository.remove(tokenEntity);

    return tokensPair;
  }
}
