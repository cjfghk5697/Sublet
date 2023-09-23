import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  //email, phone, host, guest,
  @IsString()
  username: string;

  @IsString()
  user_id: string;

  @IsEmail()
  email: string; //필수 아니기에, undefined 값도 받을 수 있도록함.

  @IsPhoneNumber()
  phone: string;
}

export class UserUpdateDto {
  //email, phone, host, guest,
  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  user_id: string;

  @IsOptional()
  @IsEmail()
  email?: string; //필수 아니기에, undefined 값도 받을 수 있도록함.

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export class userIdDto extends UserCreateDto {
  //interface와 똑같은 형식으로 변경
  @IsString()
  password: string;
}
