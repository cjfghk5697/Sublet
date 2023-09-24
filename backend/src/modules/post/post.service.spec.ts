import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { MongodbService } from '../mongodb/mongodb.service';

describe('PostService', () => {
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostService, MongodbService],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
