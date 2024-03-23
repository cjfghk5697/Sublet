import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserBase {
  @IsString()
  user_id: string;

  @IsString()
  username: string;
}

export class UserPartialBase {
  @IsString()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  username?: string;
}

export class UserExportInterface extends UserBase {
  id: string;
  image_id: string;
  school: string;
  id_card: boolean;
  gender: string;
  birth: string | Date;
  verify_school: boolean;
  verify_email: boolean;
  verify_phone: boolean;
  email: string;
  phone: string;
}

export class UserInterface extends UserExportInterface {
  student_id: number;
  like_post_id: string[];
  chat_id: string[];
  password: string;
  delete: boolean;
  version: number;
}

export interface customRequest extends Express.Request {
  user: UserInterface;
}

export class VerifyInterface {
  @IsEmail()
  email: string;
}
