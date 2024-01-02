import { UserBase, UserPartialBase } from '@/interface/user.interface';
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
  IsArray,
  IsString,
} from 'class-validator';

export class UserCreateDto extends UserBase {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  school: string; //어디 학교인지
}

export class UserUpdateDto extends UserPartialBase {
  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  school?: string; //어디 학교인지
}

export class UserFilterDto {
  @IsOptional()
  @IsArray()
  school?: string;
}
