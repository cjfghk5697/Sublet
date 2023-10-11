import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';

describe('UserService', () => {
  let service: UserService;
  const newUser = {
    user_id: 'evan',
    username: 'evan',
    email: 'evan91234@gmail.com',
    phone: '+8201011111111',
    password: 'asdfds@1!#asfseFA',
  };
  const existUser = [
    {
      user_id: 'evan2',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
    },
    {
      user_id: 'evan',
      username: 'evan',
      email: 'evan91234@gmail.com',
      phone: '+8201011111111',
      password: 'asdfds@1!#asfseFA',
    },
  ];
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
      providers: [UserService, MongodbService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);

    jest.spyOn(service, 'getAllUser').mockImplementation(async () => {
      return (await users).map((ele) => {
        const { delete: _, ...user } = ele;
        return user;
      });
    });
    jest
      .spyOn(service, 'getUserByKey')
      .mockImplementation(async (user_id: string) => {
        const u = (await users).find((ele) => {
          return ele.user_id === user_id;
        });
        if (!u) return null;
        const { delete: _, ...user } = u;
        return await user;
      });

    jest
      .spyOn(service, 'validateUser')
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
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('getAll', async () => {
      const result = await service.getAllUser();

      expect(result).toMatchObject(existUser);
    });
  });

  describe('getOne', () => {
    it('should return a user', async () => {
      const user = await service.getUserByKey('evan');
      expect(user).toBeDefined();
    });

    it('should throw not exception', () => {
      try {
        service.getUserByKey('notid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createuser', () => {
    it('create a user', async () => {
      const alluser = await service.getUserByKey('evan');
      expect(alluser).toMatchObject(newUser);
    });
  });
});
