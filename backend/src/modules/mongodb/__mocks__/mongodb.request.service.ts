import { requestStub } from '../../../stubs/mongodb.stub';

export const MongodbRequestService = jest.fn().mockReturnValue({
  getRequestByUserKey: jest.fn().mockReturnValue([requestStub()]),
  createRequest: jest.fn().mockReturnValue(requestStub()),
  deleteOneRequest: jest.fn().mockReturnValue(true),
});
