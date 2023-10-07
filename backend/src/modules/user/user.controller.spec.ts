import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './interface/user.interface';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { NotFoundException } from '@nestjs/common/exceptions';
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const newUser: User = {
    user_id: 'evan',
    username: 'evan',
    email: 'evan91234@gmail.com',
    phone: '+8201011111111',
    password: 'asdfds@1!#asfseFA',
  };
  const existUser = [
    {
      user_id: 'evan2',
      id: '65215b2fea13db3effb27cb0',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
    },
    {
      user_id: 'evan',
      username: 'evan',
      id: '65215c504fe1f169e4e0dd06',
      email: 'evan91234@gmail.com',
      phone: '+8201011111111',
      password: 'asdfds@1!#asfseFA',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService, MongodbService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);

    // jest.spyOn(userService, 'getAllUser').mockImplementation(() => {
    //   return users.map((ele) => {
    //     const { password: _, ...user } = ele;
    //     return user;
    //   });
    // });
    // jest
    //   .spyOn(userService, 'getUserByKey')
    //   .mockImplementation((user_id: string) => {
    //     const { password: _, ...user } = users.find((ele) => {
    //       return ele.user_id === user_id;
    //     });
    //     return user;
    //   });
    // jest
    //   .spyOn(userService, 'validateUser')
    //   .mockImplementation((id: string, pass: string) => {
    //     const u = users.find((ele) => {
    //       return ele.id === id;
    //     });
    //     if (!u) return null;
    //     const { password, ...user } = u;
    //     if (user && password === pass) return user;
    //     return null;
    //   });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUser', () => {
    it('properly get All Users', async () => {
      const ret_users = await controller.getAllUser();
      expect(ret_users).toStrictEqual(existUser);
    });
  });

  describe('getOneUser', () => {
    it('properly get one user when key exists', async () => {
      const ret_user = await controller.getOneUser('evan');
      expect(ret_user).toMatchObject(newUser);
    });
    it("get no user when key doesn't exist", async () => {
      expect(await controller.getOneUser('Notevan')).toThrow(NotFoundException);
    });
  });
});
