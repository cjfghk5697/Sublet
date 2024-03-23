import {
  requestExportStub,
  requestInterfaceStub,
  requestStub,
} from '../../../stubs/mongodb.stub';

export const MongodbRequestService = jest.fn().mockReturnValue({
  getRequestByUserKey: jest.fn().mockReturnValue([requestInterfaceStub()]),
  getRequestByRequestId: jest.fn().mockReturnValue([requestInterfaceStub()]),
  createRequest: jest.fn().mockReturnValue(requestInterfaceStub()),
  deleteOneRequest: jest.fn().mockReturnValue(true),
  putOneRequest: jest.fn().mockReturnValue(requestInterfaceStub()),
  putOnePostRequest: jest.fn().mockReturnValue(requestInterfaceStub()),
});
