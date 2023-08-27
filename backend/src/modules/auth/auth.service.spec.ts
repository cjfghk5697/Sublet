import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/interface/user.interface';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);

    const users: User[] = [
      {
        key: 1,
        id: 'asdf1',
        password: 'asdf',
        username: 'aaaa',
        email: 'example@gmail.com', //사이트 기본 필요 옵션인 이메일, 전화번호 추가
        phone:'010-1111-111'
      },
    ];
    jest.spyOn(userService, 'getAllUser').mockImplementation(() => {
      return users.map((ele) => {
        const { password: _, ...user } = ele;
        return user;
      });
    });
    jest
      .spyOn(userService, 'getUserByKey')
      .mockImplementation((key: number) => {
        const { password: _, ...user } = users.find((ele) => {
          return ele.key === key;
        });
        return user;
      });
    jest
      .spyOn(userService, 'validateUser')
      .mockImplementation((id: string, pass: string) => {
        const u = users.find((ele) => {
          return ele.id === id;
        });
        if (!u) return null;
        const { password, ...user } = u;
        if (user && password === pass) return user;
        return null;
      });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('return null when not existing username received', () => {
      const user = authService.validateUser('asdf', 'asdf');
      expect(user).toBeNull();
    });
    it('return null when existing username and not matching password received', () => {
      const user = authService.validateUser('asdf1', 'asdf1');
      expect(user).toBeNull();
    });
    it('return user when existing username and matching password received', () => {
      const user = authService.validateUser('asdf1', 'asdf');
      expect(user.username).toEqual('aaaa');
      expect(user.key).toEqual(1);
    });
  });
});
