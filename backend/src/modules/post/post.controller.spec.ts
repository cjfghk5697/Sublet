import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { MongodbService } from '../mongodb/mongodb.service';
import { PrismaService } from '../prisma/prisma.service';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let _mongodbService: MongodbService;
  let _prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, MongodbService, PrismaService],
    }).compile();

    controller = module.get<PostController>(PostController);
    _mongodbService = module.get(MongodbService);
    _prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
