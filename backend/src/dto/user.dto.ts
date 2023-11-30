import { UserBase, UserPartialBase } from '@/interface/user.interface';
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
  IsArray,
} from 'class-validator';

export class UserCreateDto extends UserBase {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsArray()
  tag: string[];
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
  @IsArray()
  tag?: string[];
}

export class UserTagFilterDto extends UserPartialBase {
  @IsOptional()
  @IsArray()
  tag?: string[];
}
