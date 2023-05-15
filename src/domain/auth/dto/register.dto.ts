import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterRequest, RegisterResponse } from 'src/proto/auth.pb';
import { BaseResponseDto } from 'grpc-nest-common';

export class RegisterRequestDto implements RegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Exclude()
export class RegisterResponseDto
  extends BaseResponseDto
  implements RegisterResponse {}
