import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserDto {
  //email, phone, host, guest,
  @IsNumber()
  key: number;

  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string; //필수 아니기에, undefined 값도 받을 수 있도록함.

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}

export class userIdDto extends UserDto {
  //interface와 똑같은 형식으로 변경
  @IsString()
  password: string;
}
