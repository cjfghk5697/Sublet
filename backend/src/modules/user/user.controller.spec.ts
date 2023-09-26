import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ExportUser, User } from './interface/user.interface';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const users: User[] = [
    {
      key: 1,
      id: 'asdf1',
      password: 'asdf',
      username: 'aaaa',
      email: 'example@gmail.com', //사이트 기본 필요 옵션인 이메일, 전화번호 추가
      phone: '010-1111-111',
    },
  ];

  const exportedUsers: ExportUser[] = [
    {
      key: 1,
      id: 'asdf1',
      username: 'aaaa',
      email: 'example@gmail.com', //사이트 기본 필요 옵션인 이메일, 전화번호 추가
      phone: '010-1111-111',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get(UserService);

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
    expect(controller).toBeDefined();
  });

  describe('getAllUser', () => {
    it('properly get All Users', () => {
      const ret_users = controller.getAllUser();
      expect(ret_users).toStrictEqual(exportedUsers);
    });
  });

  describe('getOneUser', () => {
    it('properly get one user when key exists', () => {
      const ret_user = controller.getOneUser(1);
      expect(ret_user).toMatchObject({
        key: 1,
        id: 'asdf1',
        username: 'aaaa',
      });
    });
    it("get no user when key doesn't exist", () => {
      const ret_user = controller.getOneUser(1);
      expect(ret_user).toBeNull;
    });
  });
});
