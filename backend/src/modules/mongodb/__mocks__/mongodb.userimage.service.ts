import { imageStub, userStub } from '../../../stubs/mongodb.stub';

export const MongodbUserImageService = jest.fn().mockReturnValue({
  getUserImage: jest.fn().mockReturnValue(imageStub()),
  saveUserImage: jest.fn().mockReturnValue(imageStub()),
  putUserImage: jest.fn().mockReturnValue(userStub()),
});
