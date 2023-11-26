import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { MongodbModule } from '../mongodb/mongodb.module';
import { MongodbService } from '../mongodb/mongodb.service';
import { ImageInterface } from '@/interface/image.interface';
import { PostInterface } from '@/interface/post.interface';

describe('PostService', () => {
  let service: PostService;
  let mongodbService: MongodbService;

  const post_dblist: PostInterface[] = [
    {
      id: '65100ecb1c9989e2d831bf6e',
      version: 1,
      key: 23,
      basic_info: '123',
      benefit: 'asdf2',
      description: 'asdf3',
      end_day: '2020-02-08T00:00:00.000Z',
      extra_info: '222',
      image_id: [],
      max_duration: 3,
      min_duration: 5,
      position: '포지션',
      refund_policy: '',
      rule: '부수면 ',
      start_day: '2020-02-06T00:00:00.000Z',
      title: 'asdfasdf',
      postuser_id: '6510082a65107d44949da19f',
      deleted: false,
      post_date: '2023-09-24T10:26:19.860Z',
      price: 10000,
    },
    {
      id: '65100ef1bb89ee8dede40a8c',
      version: 1,
      key: 24,
      basic_info: 'asdf',
      benefit: 'asdf2',
      description: 'asdf3',
      end_day: '2020-02-08T00:00:00.000Z',
      extra_info: '222',
      image_id: [],
      max_duration: 3,
      min_duration: 5,
      position: '포지션',
      refund_policy: '',
      rule: '부수면 ',
      start_day: '2020-02-06T00:00:00.000Z',
      title: '제일중요한 겁나멋있는 제목',
      postuser_id: '6510082a65107d44949da19f',
      deleted: false,
      post_date: '2023-09-24T10:26:57.608Z',
      price: 20000,
    },
  ];

  const image_dblist: ImageInterface[] = [];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MongodbModule],
      providers: [PostService],
    }).compile();

    service = module.get<PostService>(PostService);
    mongodbService = module.get(MongodbService);
    jest.spyOn(mongodbService, 'getAllPosts').mockImplementation(async () => {
      return post_dblist;
    });
    jest
      .spyOn(mongodbService, 'saveImage')
      .mockImplementation(
        async (filename: string, filetype: string, image_hash: string) => {
          const res = {
            id: image_dblist.length.toString(),
            filename,
            filetype,
            image_hash,
          };
          image_dblist.push(res);
          return res;
        },
      );
    jest
      .spyOn(mongodbService, 'getImage')
      .mockImplementation(
        async (filename: string, filetype: string, image_hash: string) => {
          const res = image_dblist.find((ele) => {
            return (
              ele.filename == filename &&
              ele.filetype == filetype &&
              ele.image_hash == image_hash
            );
          });
          if (!res) throw Error();
          return res;
        },
      );
    /*jest
      .spyOn(mongodbService, 'deleteOnePost')
      .mockImplementation(async (key: number, user: UserInterface) => {
        post_dblist.forEach(ele => {
          //to be implemented
        })
      });*/
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('GET /POST get all posts', () => {
    it('get all posts', async () => {
      const result = await service.getAllPosts({ maxPost: NaN, page: NaN });
      expect(result).toHaveLength(2);
    });
  });

  describe('POST /POST', () => {
    it('', async () => {
      const result = await service.getAllPosts({ maxPost: NaN, page: NaN });
      expect(result).toHaveLength(2);
    });
  });
});
