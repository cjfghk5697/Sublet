import { Injectable } from '@nestjs/common';
import type { UserDto, userIdDto } from './dto/user.dto';
import { ExportUser, User } from './interface/user.interface';

@Injectable()
export class UserService {
  private users: userIdDto[] = [ //
    {
      key: 1,
      id: 'asdf1',
      password: 'asdf',
      username: 'aaaa',
      email: 'example@gmail.com',
      phone:'010-1111-111'
    },
  ];

  getAllUser(): UserDto[] {
    return this.users.map((ele) => {
      const { password: _, ...user } = ele;
      return user;
    });
  }

  getUserByKey(key: number): UserDto {
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
