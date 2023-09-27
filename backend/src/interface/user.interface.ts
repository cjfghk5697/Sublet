export interface ExportUser {
  key: number;
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface UserFullTest extends ExportUser {
  password: string;
}

export class UserInterface {
  id: string;
  user_id: string;
}

// declare global {
//   namespace Express {
//     interface User extends UserInterface {}
//   }
// }

export interface customRequest extends Express.Request {
  user: UserInterface;
}
