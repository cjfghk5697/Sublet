export interface ExportUser {
  key: number;
  id: string;
  username: string;
}

export interface User extends ExportUser {
  password: string;
}
