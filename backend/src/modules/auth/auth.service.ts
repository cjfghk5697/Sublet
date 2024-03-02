import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

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
      console.log('user not found');
      return null;
    }
  }
}
