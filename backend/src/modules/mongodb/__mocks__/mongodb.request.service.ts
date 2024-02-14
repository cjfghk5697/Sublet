import { requestStub } from '../../../stubs/mongodb.stub';

export const MongodbRequestService = jest.fn().mockReturnValue({
  getRequestByUserKey: jest.fn().mockReturnValue([requestStub()]),
  createRequest: jest.fn().mockReturnValue(requestStub()),
  deleteOneRequest: jest.fn().mockReturnValue(true),
  putOneRequest: jest.fn().mockReturnValue(requestStub()),
  putOnePostRequest: jest.fn().mockReturnValue(requestStub()),
  getRequestByRequestId: jest.fn().mockReturnValue([requestStub()]),
});
