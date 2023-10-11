import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { NotFoundException } from '@nestjs/common/exceptions';
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const newUser = {
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
  const expectUsers = [
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
  ];*/

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, MongodbService],
    }).compile();

    controller = module.get<UserController>(UserController);
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
      .spyOn(controller, 'getOneUser')
      .mockImplementation(async (user_id: string) => {
        const res = await userService.getUserByKey(user_id);
        if (!res) {
          return null;
        }
        return res;
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
      });*/
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  /*
  describe('getAllUser', () => {
    it('properly get All Users', async () => {
      const ret_users = await controller.getAllUser();
      expect(ret_users).toStrictEqual(expectUsers);
    });
  });

  describe('getOneUser', () => {
    it('properly get one user when key exists', async () => {
      const ret_user = await controller.getOneUser('evan');
      expect(ret_user).toMatchObject(newUser);
    });
    it("get no user when key doesn't exist", async () => {
      const u = await controller.getOneUser('Notevan');
      expect(u).toBe(null);
    });
  });*/
});
