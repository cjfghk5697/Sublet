import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import {
  postStub,
  requestCreateStub,
  requestInterfaceStub,
  requestStub,
  userStub,
} from '../../stubs/mongodb.stub';
import {
  RequestBase,
  RequestExportInterface,
} from '@/interface/request.interface';
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
          result = await service.deleteOneRequest(requestInterfaceStub().key);
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
  describe('TESTING putOneRequest (PUT /request/:requestKey)', () => {
    describe('when calling with request update inputs', () => {
      let result: RequestExportInterface | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOneRequest(
            requestStub().key,
            requestCreateStub(),
          );
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
        expect(result).toEqual(requestStub());
      });

      it('then should call db to update post', () => {
        expect(mongoDbService.putOneRequest).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING putOnePostRequest (POST /request/post/:postKey)', () => {
    describe('when calling with request update inputs', () => {
      let result: RequestBase | undefined;
      beforeEach(async () => {
        try {
          result = await service.putOnePostRequest(
            requestStub().key,
            postStub().key,
          );
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
        expect(result).toEqual(requestStub());
      });

      it('then should call db to get request', () => {
        expect(mongoDbService.putOnePostRequest).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('TESTING getRequestByRequestId (POST /request/requestId)', () => {
    describe('when calling with request update inputs', () => {
      let result: RequestBase[] | undefined;
      const id_list = { id: [requestInterfaceStub().id] };
      beforeEach(async () => {
        try {
          result = await service.getRequestByRequestId(id_list);
        } catch (e) {
          result = undefined;
        }
      });

      it('then should return ExportInterface', () => {
        expect(result).toBeDefined();
        expect(result).toEqual([requestStub()]);
      });

      it('then should call db to update post', () => {
        expect(mongoDbService.getRequestByRequestId).toHaveBeenCalledTimes(1);
      });
    });
  });
});
