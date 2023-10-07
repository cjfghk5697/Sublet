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
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService, MongodbService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    //   jest.spyOn(userService, 'getAllUser').mockImplementation(() => {
    //     return users.map((ele) => {
    //       const { password: _, ...user } = ele;
    //       return user;
    //     });
    //   });
    //   jest
    //     .spyOn(userService, 'getUserByKey')
    //     .mockImplementation((key: number) => {
    //       const { password: _, ...user } = users.find((ele) => {
    //         return ele.key === key;
    //       });
    //       return user;
    //     });
    //   jest
    //     .spyOn(userService, 'validateUser')
    //     .mockImplementation((id: string, pass: string) => {
    //       const u = users.find((ele) => {
    //         return ele.id === id;
    //       });
    //       if (!u) return null;
    //       const { password, ...user } = u;
    //       if (user && password === pass) return user;
    //       return null;
    //     });
    //
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
