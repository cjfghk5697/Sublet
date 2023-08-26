import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
    });
  }

  /**
   * passport의 local strategy validate 부분입니다.
   * 간단하게 id과 password가 맞으면 인증에 성공합니다.
   *
   * @param id
   * @param password
   * @returns
   */
  async validate(id: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(id, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
