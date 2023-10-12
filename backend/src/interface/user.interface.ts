export interface ExportUser {
  key: number;
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  delete?: boolean;
}

export interface UserFullTest extends ExportUser {
  password: string;
}

export class UserInterface {
  id: string;
  user_id: string;
}

export interface customRequest extends Express.Request {
  user: UserInterface;
}
