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
import { UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserUpdateDto } from '@/dto/user.dto';

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
    console.log('[mongodb.service:createPost] starting function');
    console.log('[mongodb.service:createPost] data: ', data);
    console.log('[mongodb.service:createPost] user: ', user);

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
    console.log('[mongodb.service:createPost] returning function');
    return res;
  }

  async getOnePost(key: number) {
    console.log('[mongodb.service:getOnePost] starting function');
    console.log('[mongodb.service:getOnePost] key: ', key);

    const res: PostInterface | null = await this.prisma.post.findFirst({
      where: {
        key,
        deleted: false,
      },
    });
    if (!res) {
      console.log(
        '[mongodb.service:getOnePost] result is null, returning Error!',
      );
      throw Error("mongodb.service:getOnePost(), post doesn't exist");
    }
    console.log('[mongodb.service:getOnePost] returning function');
    return res;
  }

  async putOnePost(key: number, putPostBody: PostUpdateDto) {
    console.log('[mongodb.service:putOnePost] starting function');
    console.log('[mongodb.service:putOnePost] key: ', key);
    console.log('[mongodb.service:putOnePost] putPostBody: ', putPostBody);
    const res: PostInterface = await this.prisma.post.update({
      where: {
        key,
        deleted: false,
      },
      data: putPostBody,
    });
    console.log('[mongodb.service:putOnePost] returning function');
    return res;
  }

  async deleteOnePost(key: number, user: UserInterface) {
    console.log('[mongodb.service:deleteOnePost] starting function');
    console.log('[mongodb.service:deleteOnePost] key: ', key);
    console.log('[mongodb.service:deleteOnePost] user: ', user);
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
    console.log('[mongodb.service:deleteOnePost] returning function');
    return res;
  }

  async getImage(filename: string, filetype: string, image_hash: string) {
    console.log('[mongodb.service:getImage] starting function');
    console.log('[mongodb.service:getImage] filename: ', filename);
    console.log('[mongodb.service:getImage] filetype: ', filetype);
    console.log('[mongodb.service:getImage] image_hash: ', image_hash);
    const res: ImageInterface | null = await this.prisma.image.findFirst({
      where: {
        filename,
        filetype,
        image_hash,
      },
    });
    if (!res) {
      console.log(
        '[mongodb.service:getImage] result is null, returning Error!',
      );
      throw new Error("[mongodb.service:getImage] image doesn't exist");
    }
    console.log('[mongodb.service:getImage] returning function');
    return res;
  }

  async saveImage(filename: string, filetype: string, image_hash: string) {
    console.log('[mongodb.service:saveImage] starting function');
    console.log('[mongodb.service:saveImage] filename: ', filename);
    console.log('[mongodb.service:saveImage] filetype: ', filetype);
    console.log('[mongodb.service:saveImage] image_hash: ', image_hash);
    const res: ImageInterface = await this.prisma.image.create({
      data: {
        filename,
        filetype,
        image_hash,
      },
    });
    console.log('[mongodb.service:saveImage] returning function');
    return res;
  }

  async getOneUser(user_id: string) {
    console.log('[mongodb.service:getOneUser] starting function');
    console.log('[mongodb.service:getOneUser] user_id: ', user_id);
    const res: UserInterface = await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
        delete: false,
      },
    });
    console.log('[mongodb.service:getOneUser] returning function');
    return res;
  }

  async getAllUser() {
    console.log('[mongodb.service:getAllUser] starting function');
    const u: UserInterface[] = await this.prisma.user.findMany();
    console.log('[mongodb.service:getAllUser] returning function');
    return u;
  }

  async getUserByKey(user_id: string) {
    console.log('[mongodb.service:getUserByKey] starting function');
    console.log('[mongodb.service:getUserByKey] user_id: ', user_id);
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id: user_id,
        delete: false,
      },
    });
    if (!result) {
      console.log(
        '[mongodb.service:getUserByKey] result is null, returning Error!',
      );
      throw Error('[mongodb.service:getUserByKey] result null');
    }
    console.log('[mongodb.service:getUserByKey] returning function');
    return result;
  }

  async createUser(data: UserCreateDto) {
    console.log('[mongodb.service:createUser] starting function');
    console.log('[mongodb.service:createUser] data: ', data);
    const result: UserInterface = await this.prisma.user.create({
      data: { ...data },
    });
    if (!result) {
      console.log(
        '[mongodb.service:createUser] result is null, returning Error!',
      );
      throw Error();
    }
    console.log('[mongodb.service:createUser] returning function');
    return result;
  }

  async validateUser(user_id: string, password: string) {
    console.log('[mongodb.service:validateUser] starting function');
    console.log('[mongodb.service:validateUser] user_id: ', user_id);
    console.log('[mongodb.service:validateUser] password: ', password);
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        password,
        delete: false,
      },
    });
    if (!result) {
      console.log(
        '[mongodb.service:validateUser] result is null, returning Error!',
      );
      throw Error();
    }
    console.log('[mongodb.service:validateUser] returning function');
    return result;
  }

  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    console.log('[mongodb.service:putOneUser] starting function');
    console.log('[mongodb.service:putOneUser] user_id: ', user_id);
    console.log('[mongodb.service:putOneUser] putUserBody: ', putUserBody);
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      console.log(
        '[mongodb.service:putOneUser] result is null, returning Error!',
      );
      throw Error();
    }
    console.log('[mongodb.service:putOneUser] returning function');
    return res;
  }

  async deleteOneUser(user_id: string) {
    console.log('[mongodb.service:deleteOneUser] starting function');
    console.log('[mongodb.service:deleteOneUser] user_id: ', user_id);
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        delete: false,
      },
      data: {
        delete: true,
      },
    });
    if (!res) {
      console.log(
        '[mongodb.service:deleteOneUser] result is null, returning Error!',
      );
      throw Error();
    }
    console.log('[mongodb.service:deleteOneUser] returning function');
    return res;
  }
}
