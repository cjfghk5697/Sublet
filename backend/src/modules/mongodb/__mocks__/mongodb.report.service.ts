import { reportInterfaceStub } from '@/stubs/mongodb.stub';

export const MongodbReportService = jest.fn().mockReturnValue({
  postReport: jest.fn().mockReturnValue(reportInterfaceStub()),
});
