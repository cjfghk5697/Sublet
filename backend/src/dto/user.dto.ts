import {
  UserBase,
  UserPartialBase,
  VerifyInterface,
} from '@/interface/user.interface';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsInt,
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

  @IsString()
  gender: string;

  @IsDateString()
  birth: string | Date;

  @IsNumber()
  @IsInt()
  student_id: number;
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

  @IsOptional()
  @IsString()
  image_id?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birth?: string | Date;

  @IsOptional()
  @IsNumber()
  @IsInt()
  student_id?: number;
}

export class UserVerifyUpdateDto extends UserPartialBase {
  @IsString()
  tokenKey: string;

  @IsNumber()
  verifyToken: number;

  @IsOptional()
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  verify_school?: boolean;

  @IsOptional()
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  verify_email?: boolean;

  @IsOptional()
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsBoolean()
  verify_phone?: boolean;
}

export class UserFilterDto {
  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNumber()
  @IsInt()
  student_id?: number;
}

export class UserLoginDto {
  @IsString()
  id: string;

  @IsStrongPassword()
  password: string;
}

export class UserEmailVerifyDto extends VerifyInterface {}
