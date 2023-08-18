import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { extname } from 'path';

export class UserDto { //email, phone, host, guest, 
  @IsNumber()
  key: number;

  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

}

export class userIdDto extends UserDto {
  @IsString()
  password: string;
}
