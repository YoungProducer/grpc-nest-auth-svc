import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from 'src/proto/auth.pb';
import { RegisterRequestDto, RegisterResponseDto } from './dto/register.dto';
import { plainToInstance } from 'class-transformer';
import {
  VerifyCredentialsRequestDto,
  VerifyCredentialsResponseDto,
} from './dto/verify-credentials.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  public async register(dto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const res = await this.authService.register(dto);

    return plainToInstance(RegisterResponseDto, res);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  public async login(
    dto: VerifyCredentialsRequestDto,
  ): Promise<VerifyCredentialsResponseDto> {
    const res = await this.authService.verifyCredentials(dto);

    return plainToInstance(VerifyCredentialsResponseDto, res);
  }
}
