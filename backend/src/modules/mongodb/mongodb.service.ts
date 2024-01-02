import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
  PrismaPostCreateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';
import { ImageInterface } from '@/interface/image.interface';
import { IncrementkeyInterface } from '@/interface/incrementkey.interface';
import { UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MongodbService {
  USER_VERSION = 1;
  POST_VERSION = 1;
  IMAGE_VERSION = 1;
  INCREMENTKEY_VERSION = 1;

  constructor(private prisma: PrismaService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  async getAllPosts(query: PostGetAllQueryDto) {
    console.log('[mongodb.service:getAllPosts] starting function');
    console.log('[mongodb.service:getAllPosts] query: ', query);

    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
      },
      skip: query.maxPost * (query.page - 1),
      take: query.maxPost,
    });
    console.log('[mongodb.service:getAllPosts] returning function');
    return posts;
  }

  async getPostKey() {
    console.log('[mongodb.service:getPostKey] starting function');

    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    const data: IncrementkeyInterface | null =
      await this.prisma.incrementKey.findFirst({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
        },
      });
    console.log(data);
    if (!data) {
      console.log(
        '[mongodb.service:getPostKey] data is null, returning Error!',
      );
      throw new Error('mongodb.service:getPostKey(), document doesnt exist');
    }
    console.log('[mongodb.service:getPostKey] data: ', data);

    // postKey를 1 증가시키고 그 값을 받아옴
    const updated: IncrementkeyInterface =
      await this.prisma.incrementKey.update({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
          id: data.id,
        },
        data: { postKey: { increment: 1 } },
      });
    console.log('[mongodb.service:getPostKey] updated: ', updated);
    console.log('[mongodb.service:getPostKey] returning function');

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
        school: user.school,
        version: this.POST_VERSION,
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
        version: { gte: this.POST_VERSION },
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
        version: { gte: this.POST_VERSION },
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
        version: { gte: this.POST_VERSION },
        deleted: false,
        postuser: {
          user_id: user['user_id'],
        },
      },
      data: {
        deleted: true,
      },
    });
    console.log('[mongodb.service:deleteOnePost] res: ', res);
    console.log('[mongodb.service:deleteOnePost] returning function');
    return true;
  }

  async getImage(filename: string, filetype: string, image_hash: string) {
    console.log('[mongodb.service:getImage] starting function');
    console.log('[mongodb.service:getImage] filename: ', filename);
    console.log('[mongodb.service:getImage] filetype: ', filetype);
    console.log('[mongodb.service:getImage] image_hash: ', image_hash);
    const res: ImageInterface | null = await this.prisma.image.findFirst({
      where: {
        version: {
          gte: this.IMAGE_VERSION,
        },
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
        version: this.IMAGE_VERSION,
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
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    console.log('[mongodb.service:getOneUser] returning function');
    return res;
  }

  async getAllUser() {
    console.log('[mongodb.service:getAllUser] starting function');
    const u: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: {
          gte: this.USER_VERSION,
        },
      },
    });
    console.log('[mongodb.service:getAllUser] returning function');
    return u;
  }

  async getUserByKey(user_id: string) {
    console.log('[mongodb.service:getUserByKey] starting function');
    console.log('[mongodb.service:getUserByKey] user_id: ', user_id);
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
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

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;
    const result: UserInterface = await this.prisma.user.create({
      data: { ...data, version: this.USER_VERSION },
    });
    if (!result) {
      console.log(
        '[mongodb.service:createUser] result is null, returning Error!',
      );
      throw Error('[mongodb.service:createUser] result null');
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
        version: { gte: this.USER_VERSION },
        delete: false,
      },
    });

    const password_result = await bcrypt.compare(password, result!.password);
    console.log(password_result);
    if (!result || !password_result) {
      console.log(
        '[mongodb.service:validateUser] result is null, returning Error!',
      );
      throw Error(
        '[mongodb.service:validateUser] user_id or password is wrong',
      );
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
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      console.log(
        '[mongodb.service:putOneUser] result is null, returning Error!',
      );
      throw Error('[mongodb.service:putOneUser] user doesnt exist');
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
        version: { gte: this.USER_VERSION },
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
      throw Error('[mongodb.service:deleteOneUser] user doesnt exist');
    }
    console.log('[mongodb.service:deleteOneUser] returning function');
    return true;
  }

  async filterPost(query: PostFilterQueryDto) {
    console.log('[mongodb.service:filterPost] starting function');
    const post_date = {
      gt: new Date(query.fromDate || '0'),
      lt: new Date(query.toDate || '9999-12-31'),
    };
    const range_price = {
      gte: query.fromPrice || 0,
      lte: query.toPrice || 90000000,
    };

    console.log('[mongodb.service:filterPost] post_date: ', post_date);
    console.log('[mongodb.service:filterPost] range_price: ', range_price);
    console.log('[mongodb.service:filterPost] query: ', query);
    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        post_date: post_date,
        price: range_price,
        request: true,
        position: query.position,
        school: query.school,
        min_duration: { lte: query.fromDuration || 1000000 },
        max_duration: { gte: query.toDuration || 0 },
        limit_people: query.limit_people,
        number_room: query.number_room,
        number_bathroom: query.number_bathroom,
        number_bedroom: query.number_bedroom,
      },
    });
    console.log('[mongodb.service:filterPost] returning function');
    return res;
  }

  async filterUser(query: UserFilterDto) {
    console.log('[mongodb.service:filterUser] starting function');
    console.log('[mongodb.service:filterUser] post_date: ', query.school);
    const res: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: { gte: this.USER_VERSION },
        school: query.school,
      },
    });
    console.log('[mongodb.service:filterUser] returning function');
    return res;
  }
}
