import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthUserEntity } from './entities/user.entity';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { authServiceErrorMsgs } from './constants/errorr-messages';
import { comparePasswords, hashPassword } from 'src/lib/password-hasher';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmationTokenEntity } from './entities/confirmation-token.entity';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import {
  VerifyCredentialsRequestDto,
  VerifyCredentialsResponseDto,
} from './dto/verify-credentials.dto';
import { TokensService } from '../tokens/tokens.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensService: TokensService,

    @InjectRepository(AuthUserEntity)
    private readonly usersRepository: Repository<AuthUserEntity>,

    @InjectRepository(ConfirmationTokenEntity)
    private readonly confirmationTokensRepository: Repository<ConfirmationTokenEntity>,
  ) {}

  public async register({
    email,
    password,
    username,
  }: RegisterRequestDto): Promise<RegisterResponseDto> {
    const user = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });

    if (user?.username === username) {
      return {
        status: HttpStatus.CONFLICT,
        error: authServiceErrorMsgs.usernameAlreadyTaken(username),
      };
    }

    if (user?.email === email) {
      return {
        status: HttpStatus.CONFLICT,
        error: authServiceErrorMsgs.emailAlreadyTaken(email),
      };
    }

    const [hash, salt] = await hashPassword(password);

    const userToCreate = this.usersRepository.create({
      username,
      email,
      hash,
      salt,
    });

    const createdUser = await this.usersRepository.save(userToCreate);

    const token = randomStringGenerator();

    const confToken = this.confirmationTokensRepository.create({
      token,
      user: createdUser,
      expirationDate: new Date(Date.now() + 60 * 60 * 1000),
    });

    await this.confirmationTokensRepository.save(confToken);

    return {
      status: HttpStatus.CREATED,
      error: null,
    };
  }

  public async verifyCredentials({
    email,
    password,
  }: VerifyCredentialsRequestDto): Promise<VerifyCredentialsResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: authServiceErrorMsgs.userNotFound('email', email),
        data: null,
      };
    }

    const matches = await comparePasswords({
      providedPass: password,
      salt: user.salt,
      storedPass: user.hash,
    });

    if (!matches) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: authServiceErrorMsgs.invalidPassword(),
        data: null,
      };
    }

    const transformedUser = instanceToPlain(
      plainToInstance(UserDto, user),
    ) as UserDto;

    const [accessToken, refreshToken] =
      await this.tokensService.issueTokensPair(transformedUser);

    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        accessToken,
        refreshToken,
      },
    };
  }
}
