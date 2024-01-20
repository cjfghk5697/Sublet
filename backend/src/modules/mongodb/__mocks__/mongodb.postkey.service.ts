import { postStub } from '../../../stubs/mongodb.stub';

export const MongodbPostKeyService = jest.fn().mockReturnValue({
  getPostKey: jest.fn().mockReturnValue(1),
});
