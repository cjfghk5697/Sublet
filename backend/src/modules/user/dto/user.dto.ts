import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  key: number;

  @IsString()
  id: string;

  @IsString()
  password: string;
}

export class userIdDto {
  @IsNumber()
  id: number;
}
