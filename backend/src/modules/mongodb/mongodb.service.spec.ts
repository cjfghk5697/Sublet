import { Test, TestingModule } from '@nestjs/testing';
import { MongodbService } from './mongodb.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MongodbService', () => {
  let service: MongodbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbService, PrismaService],
    }).compile();

    service = module.get<MongodbService>(MongodbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
