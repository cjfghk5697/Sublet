import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '@/modules/user/user.service';
import { UserInterface } from '@/interface/user.interface';
import { UserModule } from '@/modules/user/user.module';
import { MongodbModule } from '@/modules/mongodb/mongodb.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  const users: UserInterface[] = [
    {
      id: '1',
      user_id: 'evan2',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
      delete: false,
      school: 'ABC univ',
      version: 2,
    },
    {
      id: '2',
      user_id: 'evan',
      username: 'evan',
      email: 'evan91234@gmail.com',
      phone: '+8201011111111',
      password: 'asdfds@1!#asfseFA',
      school: 'ABC univ',
      delete: false,
      version: 2,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, MongodbModule],
      providers: [AuthService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jest.spyOn(userService, 'getAllUser').mockImplementation(async () => {
      return users.map((ele) => {
        return userService.transformExport(ele);
      });
    });
    jest
      .spyOn(userService, 'validateUser')
      .mockImplementation(async (user_id: string, password: string) => {
        const result = users.find((ele) => {
          ele.user_id === user_id, ele.password === password;
        });
        if (!result) throw Error();
        return userService.transformExport(result);
      });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('return null when not existing username received', async () => {
      try {
        const _user = await authService.validateUser(
          'Notevan',
          '2136182@!asfse',
        );
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
    it('should throw error when existing username and not matching password received', async () => {
      try {
        const _user = await authService.validateUser('evan', 'asdf1');
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toBeInstanceOf(Error);
      }
    });
    it('return user when existing username and matching password received', async () => {
      try {
        const user = await authService.validateUser(
          'evan',
          'asdfds@1!#asfseFA',
        );
        if (!user) expect(true).toBe(false);
        else expect(user['user_id']).toEqual('evan');
      } catch (e) {
        expect(false);
      }
    });
  });
});
