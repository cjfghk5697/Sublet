import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/interface/user.interface';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  const newUser: User = {
    user_id: 'evan',
    username: 'evan',
    email: 'evan91234@gmail.com',
    phone: '+8201011111111',
    password: 'asdfds@1!#asfseFA',
  };
  const users = [
    {
      user_id: 'evan2',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
      delete: false,
    },
    {
      user_id: 'evan',
      username: 'evan',
      email: 'evan91234@gmail.com',
      phone: '+8201011111111',
      password: 'asdfds@1!#asfseFA',
      delete: false,
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, MongodbService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jest.spyOn(userService, 'getAllUser').mockImplementation(async () => {
      return (await users).map((ele) => {
        const { delete: _, ...user } = ele;
        return user;
      });
    });
    jest
      .spyOn(userService, 'getUserByKey')
      .mockImplementation(async (user_id: string) => {
        const u = (await users).find((ele) => {
          return ele.user_id === user_id;
        });
        if (!u) return null;
        const { delete: _, ...user } = u;
        return await user;
      });

    jest
      .spyOn(userService, 'validateUser')
      .mockImplementation(async (user_id: string, pass: string) => {
        const u = (await users).find((ele) => {
          return ele.user_id === user_id;
        });
        if (!u) return null;
        if (u && u['password'] === pass) return await u;
        return null;
      });
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('return null when not existing username received', async () => {
      const user = await authService.validateUser('Notevan', '2136182@!asfse');
      expect(user).toBeNull();
    });
    it('return null when existing username and not matching password received', async () => {
      const user = await authService.validateUser(newUser['user_id'], 'asdf1');
      expect(user).toBeNull();
    });
    it('return user when existing username and matching password received', async () => {
      const user = await authService.validateUser(
        newUser['user_id'],
        newUser['password'],
      );
      expect(user['user_id']).toEqual(newUser['user_id']);
      expect(user['password']).toEqual(newUser['password']);
    });
  });
});
