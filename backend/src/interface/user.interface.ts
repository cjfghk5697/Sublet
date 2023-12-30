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
  email: string;
  tag: string[];
  request: boolean;
}

export class UserInterface extends UserExportInterface {
  phone: string;
  password: string;
  delete: boolean;
  version: number;
}

export interface customRequest extends Express.Request {
  user: UserInterface;
}
