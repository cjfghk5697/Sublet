import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';
describe('AuthService', () => {
  let service: AuthService;
  jest.mock('../mongodb/mongodb.service');

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [AuthService, UserService, MongodbService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
