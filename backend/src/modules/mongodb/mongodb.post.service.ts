import {
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
  PrismaPostCreateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { UserInterface } from '@/interface/user.interface';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MongodbPostKeyService } from './mongodb.postkey.service';

@Injectable()
export class MongodbPostService {
  POST_VERSION = 1;

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => MongodbPostKeyService))
    private mongodbPostKeyService: MongodbPostKeyService,
  ) {}

  async getUserPostByKey(user_id: string) {
    const result: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        postuser: { user_id: user_id },
        deleted: false,
        local_save: false,
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });

    if (!result) {
      throw Error('[mongodb.service:getUserPostByKey] result null');
    }
    return result;
  }

  async getAllPosts(query: PostGetAllQueryDto) {
    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: false,
        postuser: {
          delete: false,
        },
      },
      skip: query.maxPost * (query.page - 1),
      take: query.maxPost,
      include: {
        postuser: true,
        like_user: true,
      },
    });
    return posts;
  }

  async getPostMaxKey() {
    const posts: PostInterface[] = await this.prisma.post.findMany({
      include: {
        postuser: true,
        like_user: true,
      },
    });
    if (!posts || posts.length === 0) return 0;
    return posts.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, posts[0].key);
  }

  /**
   * 전해준 데이터를 기반으로 post를 만듦
   *
   * @param data
   * @returns
   */
  async createPost(data: PrismaPostCreateDto, user: UserInterface) {
    const res: PostInterface = await this.prisma.post.create({
      data: {
        ...data,
        key: await this.mongodbPostKeyService.getPostKey(), // 새로운 postKey를 받아옴
        postuser: {
          connect: {
            user_id: user.user_id,
          },
        },
        version: this.POST_VERSION,
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });
    return res;
  }

  async getOnePost(key: number) {
    const res: PostInterface | null = await this.prisma.post.findFirst({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: false,
        postuser: {
          delete: false,
        },
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });
    if (!res) {
      throw Error("mongodb.service:getOnePost(), post doesn't exist");
    }
    return res;
  }

  async putOnePost(key: number, putPostBody: PostUpdateDto) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        postuser: {
          delete: false,
        },
      },
      include: {
        postuser: true,
        like_user: true,
      },
      data: putPostBody,
    });
    return res;
  }

  async deleteOnePost(key: number, user: UserInterface) {
    // 조건에 맞는 Record가 없으면 RecordNotFound Exception이 발생함
    await this.prisma.post.update({
      where: {
        key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        postuser: {
          user_id: user['user_id'],
        },
        reservation: {
          none: {
            deleted: false,
          },
        },
      },
      data: {
        deleted: true,
      },
    });

    return true;
  }

  async filterPost(query: PostFilterQueryDto) {
    const range_price = {
      gte: query.fromPrice || 0,
      lte: query.toPrice || 90000000,
    };

    console.log('qr', query);

    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        start_day: { lte: new Date(query.fromDate || '0') },
        end_day: { gte: new Date(query.toDate || '9999-12-31') },
        price: range_price,
        city: query.city ?? undefined, // query.city가 있으면 사용하고 없으면 무시
        gu: query.gu ?? undefined, // query.gu가 있으면 사용하고 없으면 무시
        deleted: false,
        local_save: false,
        postuser: {
          delete: false,
        },
        ...(query.position ? { position: query.position } : {}), // query.position이 있으면 추가
        ...(query.fromDuration !== undefined
          ? { min_duration: { lte: query.fromDuration } }
          : {}),
        ...(query.toDuration !== undefined
          ? { max_duration: { gte: query.toDuration } }
          : {}),
        ...(query.limit_people !== undefined
          ? { limit_people: query.limit_people }
          : {}),
        ...(query.number_room !== undefined
          ? { number_room: query.number_room }
          : {}),
        ...(query.number_bathroom !== undefined
          ? { number_bathroom: query.number_bathroom }
          : {}),
        ...(query.number_bedroom !== undefined
          ? { number_bedroom: query.number_bedroom }
          : {}),
        ...(query.x_coordinate !== undefined
          ? { x_coordinate: query.x_coordinate }
          : {}),
        ...(query.y_coordinate !== undefined
          ? { y_coordinate: query.y_coordinate }
          : {}),
        ...(query.dong ? { dong: query.dong } : {}),
        ...(query.street ? { street: query.street } : {}),
        ...(query.street_number !== undefined
          ? { street_number: query.street_number }
          : {}),
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });

    console.log('post_date', res);

    return res;
  }

  async getLocalPost(user: UserInterface) {
    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: true,
        postuser: {
          user_id: user['user_id'],
        },
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });
    return res;
  }

  async getLikePosts(user_id: string) {
    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        like_user: {
          some: { user_id: user_id },
        },
        deleted: false,
        local_save: false,
        postuser: {
          delete: false,
        },
      },
      include: { postuser: true, like_user: true },
    });
    return res;
  }

  async likePost(post_key: number, user: UserInterface) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key: post_key,
        version: { gte: this.POST_VERSION },
        deleted: false,
        local_save: false,
        like_user: {
          none: {
            id: user['id'],
          },
        },
      },
      data: {
        like_count: {
          increment: 1,
        },
        like_user: {
          connect: {
            id: user['id'],
          },
        },
      },
      include: {
        postuser: true,
        like_user: true,
      },
    });
    return res;
  }

  async unlikePost(post_key: number, user: UserInterface) {
    try {
      // 먼저 존재 여부를 확인합니다.
      const post = await this.prisma.post.findFirst({
        where: {
          key: post_key,
          version: { gte: this.POST_VERSION },
          deleted: false,
          local_save: false,
          like_user: {
            some: {
              id: user['id'],
            },
          },
        },
        include: {
          like_user: true,
        },
      });

      if (!post) {
        // Post가 존재하지 않거나 조건에 맞는 Like 관계가 없는 경우
        throw new Error('해당 Post가 없거나 좋아요 관계가 존재하지 않습니다.');
      }

      // 존재한다면 update를 진행합니다.
      const res: PostInterface = await this.prisma.post.update({
        where: {
          key: post_key,
        },
        data: {
          like_count: {
            decrement: 1,
          },
          like_user: {
            disconnect: {
              id: user['id'],
            },
          },
        },
        include: {
          like_user: true,
          postuser: true,
        },
      });

      return res;
    } catch (error) {
      console.error('Unlike post error:', error.message);
      throw new Error('좋아요 취소 작업 중 오류가 발생했습니다.');
    }
  }
}
