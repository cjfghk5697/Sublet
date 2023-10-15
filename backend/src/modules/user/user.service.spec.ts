import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserInterface } from '@/interface/user.interface';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbService } from '../mongodb/mongodb.service';

describe('UserService', () => {
  let service: UserService;
  const _users: UserInterface[] = [
    {
      id: '1',
      user_id: 'evan2',
      password: '5s34S2349!#',
      username: 'evan2',
      email: 'chfgadg@gmail.com',
      phone: '+82343512534',
      delete: false,
    },
    {
      id: '2',
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
      imports: [MongodbModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    const mongodbService = module.get<MongodbService>(MongodbService);
    jest.spyOn(mongodbService, 'getAllUser').mockImplementation(async () => {
      return _users;
    });
    jest
      .spyOn(mongodbService, 'getUserByKey')
      .mockImplementation(async (user_id: string) => {
        const user = _users.find(
          (ele) => ele.user_id === user_id && !ele.delete,
        );
        if (!user) throw new NotFoundException();
        return user;
      });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('getAll', async () => {
      const result = await service.getAllUser();
      expect(result).toMatchObject(_users);
    });
  });

  describe('getOne', () => {
    it('should return a user', async () => {
      try {
        const user = await service.getUserByKey('evan');
        expect(user).toBeDefined();
      } catch (e) {
        expect(false).toBe(true);
      }
    });

    it('should throw notfound exception', async () => {
      try {
        const result = await service.getUserByKey('notid');
        expect(result).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('createuser', () => {
    it('create a user', async () => {
      try {
        const alluser = await service.getUserByKey('evan');
        expect(alluser.user_id).toEqual('evan');
        expect(alluser.id).toEqual('2');
      } catch (e) {
        // error를 던지지 말아야 함
        expect(false).toBe(true);
      }
    });
  });
});
