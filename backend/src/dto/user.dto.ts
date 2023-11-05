import { UserBase } from '@/interface/user.interface';
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsString,
  IsOptional,
} from 'class-validator';

export class UserCreateDto extends UserBase {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber()
  phone: string;
}

export class UserUpdateDto extends UserBase {
  @IsOptional()
  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
