import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 주어진 `id`과 `pass`로 맞는 user를 반환합니다.
   * 없다면 null을 반환합니다.
   *
   * @param id
   * @param pass
   * @returns
   */
  async validateUser(id: string, pass: string) {
    try {
      const user = await this.usersService.validateUser(id, pass);
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { id: user.id, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
