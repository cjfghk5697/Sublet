import { Injectable } from '@nestjs/common';
import type { UserCreateDto, userIdDto } from './dto/user.dto'; //interface 삭제 및 Dto 사

@Injectable()
export class UserService {
  private users: userIdDto[] = [ 
    {
      username: "han",
      user_id: 'asdf1',
      password: 'asdf',
      email: 'example@gmail.com', //사이트 기본 필요 옵션인 이메일, 전화번호 추가
      phone:'010-1111-111'
    },
  ];

  getAllUser(): UserCreateDto[] { //전부 UserDto로 변경
    return this.users.map((ele) => {
      const { password: _, ...user } = ele;
      return user;
    });
  }

  getUserByKey(user_id: string): UserCreateDto {
    const { password: _, ...user } = this.users.find((ele) => {
      return ele.user_id === user_id;
    });
    return user;
  }

  validateUser(id: string, pass: string) {
    const u = this.users.find((ele) => {
      return ele.user_id === id;
    });
    console.log(u);
    if (!u) return null;
    const { password, ...user } = u;
    if (password === pass) return user;
    return null;
  }
}
