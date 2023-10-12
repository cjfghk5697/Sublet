import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PostGetAllQueryDto,
  PostUpdateDto,
  PrismaPostCreateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { ImageInterface } from '@/interface/image.interface';
import { IncrementkeyInterface } from '@/interface/incrementkey.interface';
import { User, UserInterface } from '@/interface/user.interface';
import { UserInfoDto } from '@/dto/user.dto';

@Injectable()
export class MongodbService {
  constructor(private prisma: PrismaService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  async getAllPosts(query: PostGetAllQueryDto) {
    // 과도하게 높거나 값이 해당 범위가 아니라면 기본값으로 설정
    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;
    query.page = this.isPositiveInt(query.page, 1);

    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany({
      where: {
        deleted: false,
      },
    });

    // 페이지 당 포스트수와 현재 페이지를 기본으로 리스트를 반환
    return posts.slice(
      query.maxPost * (query.page - 1),
      query.maxPost * query.page,
    );
  }

  async getPostKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    const data: IncrementkeyInterface | null =
      await this.prisma.incrementKey.findFirst();
    if (!data)
      throw new Error('mongodb.service:getPostKey(), document doesnt exist');

    // postKey를 1 증가시키고 그 값을 받아옴
    const updated: IncrementkeyInterface =
      await this.prisma.incrementKey.update({
        where: {
          id: data.id,
        },
        data: { postKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.postKey;
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
        key: await this.getPostKey(), // 새로운 postKey를 받아옴
        postuser: {
          connect: {
            user_id: user.user_id,
          },
        },
      },
    });
    return res;
  }

  async getOnePost(key: number) {
    const res: PostInterface | null = await this.prisma.post.findFirst({
      where: {
        key,
        deleted: false,
      },
    });
    if (!res) throw Error("mongodb.service:getOnePost(), post doesn't exist");
    return res;
  }

  async putOnePost(key: number, putPostBody: PostUpdateDto) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
        deleted: false,
      },
      data: putPostBody,
    });
    return res;
  }

  async deleteOnePost(key: number, user: UserInterface) {
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
        deleted: false,
        postuser: {
          user_id: user['user_id'],
        },
      },
      data: {
        deleted: true,
      },
    });
    return res;
  }

  async getImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface | null = await this.prisma.image.findFirst({
      where: {
        filename,
        filetype,
        image_hash,
      },
    });
    if (!res)
      throw new Error("mongodb.service:getImage(), image doesn't exist");
    return res;
  }

  async saveImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface = await this.prisma.image.create({
      data: {
        filename,
        filetype,
        image_hash,
      },
    });
    return res;
  }

  async getOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
      },
    });
    return res;
  }

  // user
  async getAllUser() {
    //전부 UserDto로 변경
    const u: User[] = await this.prisma.user.findMany();
    return u;
  }

  async getUserByKey(user_id: string) {
    const result: User | null = await this.prisma.user.findFirst({
      where: {
        user_id: user_id,
      },
    });
    if (!result) throw Error();
    return result;
  }

  async createUser(data: UserInfoDto) {
    try {
      return await this.prisma.user.create({
        data: { ...data },
      });
    } catch (e) {
      throw e;
    }
  }

  async validateUser(id: string) {
    const result: User | null = await this.prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
    if (!result) throw Error();
    return result;
  }
}
