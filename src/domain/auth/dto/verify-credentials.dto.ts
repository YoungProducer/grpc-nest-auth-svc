import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  LoginRequest,
  LoginResponse,
  LoginResponse_Data,
} from 'src/proto/auth.pb';
import { BaseResponseDto } from 'grpc-nest-common';
import { Exclude, Expose, Type } from 'class-transformer';

export class VerifyCredentialsRequestDto implements LoginRequest {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

@Exclude()
export class VerifyCredentialsData implements LoginResponse_Data {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

@Exclude()
export class VerifyCredentialsResponseDto
  extends BaseResponseDto
  implements LoginResponse
{
  @Expose()
  @Type(() => VerifyCredentialsData)
  data: VerifyCredentialsData | null;
}
