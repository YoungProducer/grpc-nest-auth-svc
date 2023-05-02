import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsString()
  email: string;
}
