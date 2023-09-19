import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';

describe('PostController', () => {
  let controller: PostController;
  let mongodbService: MongodbService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [MongodbService, PrismaService],
    }).compile();

    controller = module.get<PostController>(PostController);
    mongodbService = module.get(MongodbService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
