import { Injectable } from '@nestjs/common';
import type { UserDto } from './dto/user.dto';
import { ExportUser, User } from './interface/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      key: 1,
      id: 'asdf1',
      password: 'asdf',
      username: 'aaaa',
    },
  ];

  getAllUser(): ExportUser[] {
    return this.users.map((ele) => {
      const { password: _, ...user } = ele;
      return user;
    });
  }

  getUserByKey(key: number): ExportUser {
    const { password: _, ...user } = this.users.find((ele) => {
      return ele.key === key;
    });
    return user;
  }

  validateUser(id: string, pass: string) {
    const u = this.users.find((ele) => {
      return ele.id === id;
    });
    console.log(u);
    if (!u) return null;
    const { password, ...user } = u;
    if (password === pass) return user;
    return null;
  }
}
