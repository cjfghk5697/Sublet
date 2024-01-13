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
import {
  FilterReservationInterface,
  ReservationInterface,
} from '@/interface/reservation.interface';

@Injectable()
export class MongodbService {
  USER_VERSION = 2;
  POST_VERSION = 1;
  IMAGE_VERSION = 1;
  INCREMENTKEY_VERSION = 1;
  RESERVATION_VERSION: number = 1;

  constructor(private prisma: PrismaService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  async getAllPosts(query: PostGetAllQueryDto) {
    // 모든 포스트를 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴
    const posts: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        deleted: false,
      },
      skip: query.maxPost * (query.page - 1),
      take: query.maxPost,
    });
    return posts;
  }

  async getPostMaxKey() {
    const posts: PostInterface[] = await this.prisma.post.findMany({});
    if (!posts || posts.length === 0) return 0;
    return posts.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, posts[0].key);
  }

  async getPostKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    let data: IncrementkeyInterface | null =
      await this.prisma.incrementKey.findFirst({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
        },
      });
    if (!data) {
      data = await this.prisma.incrementKey.create({
        data: {
          postKey: await this.getPostMaxKey(),
          version: this.INCREMENTKEY_VERSION,
        },
      });
      if (!data) throw Error("[mongodb.service:getPostKey] can't create data");
    }

    // postKey를 1 증가시키고 그 값을 받아옴
    const updated: IncrementkeyInterface =
      await this.prisma.incrementKey.update({
        where: {
          version: { gte: this.INCREMENTKEY_VERSION },
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
        version: this.POST_VERSION,
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
      },
      data: putPostBody,
    });
    return res;
  }

  async deleteOnePost(key: number, user: UserInterface) {
    await this.prisma.post.update({
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
    return true;
  }

  async getImage(filename: string, filetype: string, image_hash: string) {
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
      throw new Error("[mongodb.service:getImage] image doesn't exist");
    }
    return res;
  }

  async saveImage(filename: string, filetype: string, image_hash: string) {
    const res: ImageInterface = await this.prisma.image.create({
      data: {
        filename,
        filetype,
        image_hash,
        version: this.IMAGE_VERSION,
      },
    });
    return res;
  }

  async getOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    return res;
  }

  async getAllUser() {
    const u: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: {
          gte: this.USER_VERSION,
        },
      },
    });
    return u;
  }

  async getUserByKey(user_id: string) {
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
      throw Error('[mongodb.service:getUserByKey] result null');
    }
    return result;
  }

  async createUser(data: UserCreateDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;
    const result: UserInterface = await this.prisma.user.create({
      data: { ...data, version: this.USER_VERSION },
    });
    if (!result) {
      throw Error('[mongodb.service:createUser] result null');
    }
    return result;
  }

  async validateUser(user_id: string, password: string) {
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
    });

    const password_result = await bcrypt.compare(password, result!.password);
    if (!result || !password_result) {
      throw Error(
        '[mongodb.service:validateUser] user_id or password is wrong',
      );
    }
    return result;
  }

  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      throw Error('[mongodb.service:putOneUser] user doesnt exist');
    }
    return res;
  }

  async deleteOneUser(user_id: string) {
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
      throw Error('[mongodb.service:deleteOneUser] user doesnt exist');
    }

    return true;
  }

  async filterPost(query: PostFilterQueryDto) {
    const post_date = {
      gt: new Date(query.fromDate || '0'),
      lt: new Date(query.toDate || '9999-12-31'),
    };
    const range_price = {
      gte: query.fromPrice || 0,
      lte: query.toPrice || 90000000,
    };

    const res: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },
        post_date: post_date,
        price: range_price,
        request: true,
        position: query.position,
        min_duration: { lte: query.fromDuration || 1000000 },
        max_duration: { gte: query.toDuration || 0 },
        limit_people: query.limit_people,
        number_room: query.number_room,
        number_bathroom: query.number_bathroom,
        number_bedroom: query.number_bedroom,
        x_coordinate: query.x_coordinate,
        y_coordinate: query.y_coordinate,
        city: query.city,
        gu: query.gu,
        dong: query.dong,
        street: query.street,
        street_number: query.street_number,
      },
    });
    return res;
  }
  async filterUser(query: UserFilterDto) {
    const res: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: { gte: this.USER_VERSION },
        school: query.school,
      },
    });
    return res;
  }

  async createReservation(data: ReservationInterface, user: UserInterface) {
    const available = await this.filterReservation(data);
    if (available) {
      await this.prisma.reservation.create({
        data: {
          r_start_day: data.r_start_day,
          r_end_day: data.r_end_day,
          User: {
            connect: {
              user_id: user.user_id,
            },
          },
          Post: {
            connect: {
              key: Number(data.post_key),
            },
          },
          version: this.RESERVATION_VERSION,
        },
      });
    } else {
      throw new Error('reserved date');
    }
    return true;
  }

  async filterReservation(data: ReservationInterface) {
    const reservation_list: FilterReservationInterface[] =
      await this.prisma.reservation.findMany({
        where: {
          r_start_day: {
            gte: new Date(data.r_start_day),
            lte: new Date(data.r_end_day),
          },
          r_end_day: {
            gte: new Date(data.r_start_day),
            lte: new Date(data.r_end_day),
          },
          version: { gte: this.RESERVATION_VERSION },
          deleted: false,
        },
        include: {
          Post: true,
        },
      });

    let flag = false;
    reservation_list.map((reservation) => {
      if (reservation['Post'].key == Number(data.post_key)) {
        flag = true;
        return false;
      }
    });
    if (flag) {
      throw new Error('reserved date');
    }
    return true;
  }
}
