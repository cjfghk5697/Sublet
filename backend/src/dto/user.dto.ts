import { UserBase, UserPartialBase } from '@/interface/user.interface';
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
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
}
