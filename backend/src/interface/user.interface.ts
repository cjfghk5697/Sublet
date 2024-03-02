import { IsOptional, IsString } from 'class-validator';

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
  email: string;
  school: string;
  phone: string;
  id_card: boolean;
  like_post_id: string[];
  gender: string;
  birth: string | Date;
  student_id: number;
  verify_school: boolean;
  verify_email: boolean;
  verify_phone: boolean;
  chat_id: string[];
}

export class UserInterface extends UserExportInterface {
  password: string;
  delete: boolean;
  version: number;
}

export interface customRequest extends Express.Request {
  user: UserInterface;
}
