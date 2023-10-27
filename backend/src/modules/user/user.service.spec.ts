import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserInterface } from '@/interface/user.interface';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbService } from '../mongodb/mongodb.service';
import { Body } from '@nestjs/common';
import { UserUpdateDto } from '@/dto/user.dto';

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
    jest
      .spyOn(mongodbService, 'deleteOneUser')
      .mockImplementation(async (user_id: string) => {
        const ind = _users.findIndex(
          (ele) => ele.user_id === user_id && !ele.delete,
        );
        if (ind === -1) throw new NotFoundException();

        _users[ind].delete = true;
        const user = _users.find(
          (ele) => ele.user_id === user_id && !ele.delete,
        );
        if (!user) throw new NotFoundException();
        return user;
      });
    jest
      .spyOn(mongodbService, 'putOneUser')
      .mockImplementation(
        async (user_id: string, putUserdata: UserUpdateDto) => {
          const ind = _users.findIndex(
            (ele) => ele.user_id === user_id && !ele.delete,
          );
          if (ind === -1) throw new NotFoundException();

          const user = Object.assign(_users[ind], putUserdata);
          return user;
        },
      );
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

  describe('deleteUser', () => {
    it('delete One User', async () => {
      try {
        expect(await service.deleteOneUser('evan')).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
    it('should throw not found', async () => {
      try {
        expect(await service.deleteOneUser('notid')).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('putUser', () => {
    const correctdata = {
      user_id: 'evan2',
      password: '5s34S2349!@',
      username: 'evan5',
      email: 'chfgadg@gmail.com',
      phone: '+82343512532',
      delete: false,
    };
    it('putOneUser', async () => {
      try {
        await service.putOneUser('evan', correctdata);
        const getoneuser = await service.getUserByKey('evan2');
        expect(getoneuser.username).toBe('evan5');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
