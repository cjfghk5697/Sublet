import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateDto {
  //email, phone, host, guest,
  @IsString()
  user_id: string;

  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string; //필수 아니기에, undefined 값도 받을 수 있도록함.

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsBoolean()
  delete?: boolean;
}

export class UserUpdateDto {
  //email, phone, host, guest,
  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  user_id: string;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string; //필수 아니기에, undefined 값도 받을 수 있도록함.

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  delete?: boolean;
}
