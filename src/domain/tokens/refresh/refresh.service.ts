import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Repository } from 'typeorm';
import { RefreshTokenEntity } from '../entities/refresh-token.entity';
import { refreshErrorMessages } from './constants/error-messages';
import { UserEntity } from 'src/domain/auth/entities/user.entity';

@Injectable()
export class RefreshService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,

    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokensRepository: Repository<RefreshTokenEntity>,
  ) {}

  public async create(userId: number): Promise<string> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(
        refreshErrorMessages.getUserNotFoundErr(userId),
      );
    }

    const token = randomStringGenerator();

    const entity = this.refreshTokensRepository.create({
      token,
      user,
    });

    await this.refreshTokensRepository.save(entity);

    return token;
  }

  public async validate(token: string): Promise<RefreshTokenEntity> {
    const entity = await this.refreshTokensRepository.findOne({
      where: {
        token,
      },
      relations: ['user'],
    });

    if (!entity) {
      throw new UnauthorizedException(
        refreshErrorMessages.getInvalidTokenErr(),
      );
    }

    return entity;
  }
}
