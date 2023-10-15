import { UserBase } from '@/interface/user.interface';
import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';

export class UserCreateDto extends UserBase {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber()
  phone: string;
}

export class UserUpdateDto extends UserBase {}
