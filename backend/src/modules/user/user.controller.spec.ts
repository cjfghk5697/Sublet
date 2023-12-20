import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserInterface } from '@/interface/user.interface';
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  /*const newUser = {
    user_id: 'evan',
    username: 'evan',
    email: 'evan91234@gmail.com',
    phone: '+8201011111111',
    password: 'asdfds@1!#asfseFA',
  };*/
  const users: UserInterface[] = [
    {
      id: '1',
      user_id: 'evan2',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
      delete: false,
      tag: ['student'],
      version: 2,
    },
    {
      id: '2',
      user_id: 'evan',
      username: 'evan',
      email: 'evan91234@gmail.com',
      phone: '+8201011111111',
      password: 'asdfds@1!#asfseFA',
      tag: ['student'],
      delete: false,
      version: 2,
    },
  ];
  /*const expectUsers = [
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
        const u = users.find((ele) => {
          return ele.user_id === user_id;
        });
        if (!u) throw Error();
        const { delete: _, ...user } = u;
        return user;
      });
    jest
      .spyOn(controller, 'getOneUser')
      .mockImplementation(async (user_id: string) => {
        const res = await userService.getUserByKey(user_id);
        if (!res) throw Error();
        return res;
      });

    jest
      .spyOn(userService, 'validateUser')
      .mockImplementation(async (user_id: string, password: string) => {
        const u: UserInterface | undefined = users.find((ele) => {
          return ele.user_id === user_id && ele.password === password;
        });
        if (!u) throw Error();
        return u;
      });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
