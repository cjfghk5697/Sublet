export interface ExportUser {
  key: number;
  id: string;
  username: string;
  email: string;
  phone: string;
}

export interface User extends ExportUser {
  password: string;
}
