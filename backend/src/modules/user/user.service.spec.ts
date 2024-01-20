import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserExportInterface } from '@/interface/user.interface';
import { MongodbService } from '../mongodb/mongodb.service';
import {
  multerFileStub,
  userExportStub,
  userFilterStub,
  userStub,
  userUpdateStub,
} from '../mongodb/__mocks__/stubs/mongodb.stub';

jest.mock('../mongodb/mongodb.service');

describe('UserService', () => {
  let service: UserService;
  let mongodbService: MongodbService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [UserService, MongodbService],
    }).compile();

    service = module.get<UserService>(UserService);
    mongodbService = module.get<MongodbService>(MongodbService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('TESTING getAllUser (GET /user)', () => {
    describe('When calling User', () => {
      let result: UserExportInterface[] | Error;

      beforeEach(async () => {
        try {
          result = await service.getAllUser();
        } catch (e) {
          result = e;
        }
      });

      it('should call user', () => {
        expect(result).toEqual([userExportStub()]);
      });

      it('should be array', () => {
        expect(result).toBeInstanceOf(Array);
      });
    });
  });

  describe('TESTING getUserByKey (GET /user/:user_id)', () => {
    describe('when calling with id', () => {
      let result: UserExportInterface | undefined;
      const user_id = 'fsh_12';
      beforeEach(async () => {
        try {
          result = await service.getUserByKey(user_id);
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to get a user', () => {
        expect(mongodbService.getUserByKey).toHaveBeenCalledTimes(1);
      });

      it('then should call db to get one User with given parameters', () => {
        expect(mongodbService.getUserByKey).toHaveBeenCalledWith(user_id);
      });

      it('then should call db to get one User', () => {
        expect(mongodbService.getUserByKey).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING createUser (Post /user/:user_id)', () => {
    describe('when calling with normal input', () => {
      let result: UserExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.createUser(userStub());
        } catch (_e) {
          result = undefined;
        }
      });
      it('then should return interface', () => {
        expect(result).toBeDefined();
      });
      it('then should call db to create user', () => {
        expect(mongodbService.createUser).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING deleteOneUser (DELETE /user/:user_id', () => {
    describe('when calling with user delete', () => {
      let result: boolean | undefined;
      beforeEach(async () => {
        try {
          result = await service.deleteOneUser('example');
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return boolena', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to delete user', () => {
        expect(mongodbService.deleteOneUser).toHaveBeenCalledTimes(1);
      });

      it('then should call db to delete user with given parameters', () => {
        expect(mongodbService.deleteOneUser).toHaveBeenCalledWith('example');
      });
    });
  });

  describe('TESTING putOneUser (UPDATE /user/:user_id', () => {
    describe('when calling with user update inputs', () => {
      let result: UserExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOneUser('mocked-user_id', userUpdateStub());
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to update user', () => {
        expect(mongodbService.putOneUser).toHaveBeenCalledTimes(1);
      });

      it('then should db to update user with given parameters', () => {
        expect(mongodbService.putOneUser).toHaveBeenCalledWith(
          'mocked-user_id',
          userUpdateStub(),
        );
      });
    });
  });

  describe('TESTING filterUser', () => {
    describe('when calling with user filter query', () => {
      let result: UserExportInterface[] | undefined;
      beforeEach(async () => {
        try {
          result = await service.filterUser(userFilterStub());
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return array', () => {
        expect(result).toBeDefined();
        expect(result).toEqual([userExportStub()]);
      });

      it('then should call db to filter user', () => {
        expect(mongodbService.filterUser).toHaveBeenCalledTimes(1);
      });

      it('then should call db to filter user with given parameters', () => {
        expect(mongodbService.filterUser).toHaveBeenCalledWith(
          userFilterStub(),
        );
      });
    });
  });
});
