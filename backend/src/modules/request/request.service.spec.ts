import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { requestStub, userStub } from '../../stubs/mongodb.stub';
import { RequestBase } from '@/interface/request.interface';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbRequestService } from '../mongodb/mongodb.request.service';

jest.mock('../mongodb/mongodb.post.service');
jest.mock('../mongodb/mongodb.postimage.service');
jest.mock('../mongodb/mongodb.postkey.service');
jest.mock('../mongodb/mongodb.reservation.service');
jest.mock('../mongodb/mongodb.request.service');
jest.mock('../mongodb/mongodb.user.service');

describe('RequestService', () => {
  let service: RequestService;
  let mongoDbService: MongodbRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule],
      providers: [RequestService],
    }).compile();

    service = module.get<RequestService>(RequestService);
    mongoDbService = module.get(MongodbRequestService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('TESTING createRequest (POST /request)', () => {
    describe('when calling with normal input', () => {
      let result: RequestBase | undefined;

      beforeEach(async () => {
        try {
          result = await service.createRequest(requestStub(), userStub());
        } catch (_e) {
          result = undefined;
        }
      });

      it('then should return interface', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to create request', () => {
        expect(mongoDbService.createRequest).toHaveBeenCalledTimes(1);
        expect(mongoDbService.createRequest).toHaveBeenCalledWith(
          requestStub(),
          userStub(),
        );
      });
    });
  });

  describe('TESTING deleteOneRequest (DELETE /request)', () => {
    describe('when calling with resevation delete inputs', () => {
      let result: boolean | undefined;
      beforeEach(async () => {
        try {
          result = await service.deleteOneRequest(requestStub().key);
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return boolean', () => {
        expect(result).toBeDefined();
      });

      it('then should call db to delete request', () => {
        expect(mongoDbService.deleteOneRequest).toHaveBeenCalledTimes(1);
      });

      it('then should call db to delete request with given parameters', () => {
        expect(mongoDbService.deleteOneRequest).toHaveBeenCalledWith(
          requestStub().key,
        );
      });
    });
  });

  describe('TESTING getRequestByUserKey (GET /request)', () => {
    describe('When calling with NaN parameters', () => {
      let result: RequestBase[] | Error;
      beforeEach(async () => {
        try {
          result = await service.getRequestByUserKey(userStub().user_id);
        } catch (e) {
          result = e;
        }
      });

      it('should call db with default parameters', async () => {
        expect(mongoDbService.getRequestByUserKey).toHaveBeenCalledWith(
          userStub().user_id,
        );
      });

      it('should return one request', () => {
        expect(result).toEqual([requestStub()]);
      });
    });
  });
});
