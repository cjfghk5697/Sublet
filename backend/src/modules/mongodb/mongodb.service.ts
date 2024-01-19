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
import {
  IncrementkeyInterface,
  reservationIncrementKeyInterface,
} from '@/interface/incrementkey.interface';
import { UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import * as bcrypt from 'bcrypt';
import {
  ReservationExportInterface,
  ReservationInterface,
} from '@/interface/reservation.interface';
import {
  ReservationCreateDto,
  ReservationFilterDto,
} from '@/dto/reservation.dto';

@Injectable()
export class MongodbService {
  USER_VERSION = 2;
  POST_VERSION = 1;
  IMAGE_VERSION = 1;
  INCREMENTKEY_VERSION = 1;
  RESERVATION_INCREMENTKEY_VERSION = 1;
  RESERVATION_VERSION = 1;

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

  async createReservation(data: ReservationCreateDto, user: UserInterface) {
    const key = Number(await this.getReservationKey());
    console.log('key', key);
    const available = await this.filterReservation(data);

    const getDateDiff = (d1: string | Date, d2: string | Date) => {
      const date1 = new Date(d1);
      const date2 = new Date(d2);

      const diffDate = date1.getTime() - date2.getTime(); //gettime 함수는  number of milliseconds로 return함

      return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
    };
    const pay = getDateDiff(data.r_end_day, data.r_start_day) * data.pay;

    if (available.length < 1) {
      await this.prisma.reservation.create({
        data: {
          r_start_day: data.r_start_day,
          r_end_day: data.r_end_day,
          pay: pay,
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
          key: await this.getReservationKey(),
        },
      });
    } else {
      throw new Error('reserved date');
    }
    return true;
  }

  async filterReservation(data: ReservationFilterDto) {
    const reservation_date = {
      gte: new Date(data.r_start_day || '0'), //날짜 현재로 수정해서 지난건 안보이게?
      lte: new Date(data.r_end_day || '9999-12-31'),
    };

    const reservation_list: ReservationInterface[] =
      await this.prisma.reservation.findMany({
        where: {
          r_start_day: reservation_date,
          r_end_day: reservation_date,
          key: data.key,
          version: { gte: this.RESERVATION_VERSION },
          deleted: false,
        },
        include: {
          User: true, //query 받아서 결정하도록, 이거 다하면 너무 heavy함
          Post: {
            include: {
              postuser: true,
            },
          },
        },
      });
    return reservation_list;
  }

  async getAllReservations(user_id: string) {
    // 특정 유저의 모든 예약을 가져옴, 나중에는 Query Parameter을 이용해 필터하여 가져옴

    const reservation_list: ReservationInterface[] =
      await this.prisma.reservation.findMany({
        where: {
          version: { gte: this.RESERVATION_VERSION },
          deleted: false,
        },
        include: {
          User: true, //query 받아서 결정하도록, 이거 다하면 너무 heavy함
          Post: {
            include: {
              postuser: true,
            },
          },
        },
      });
    let final_list: ReservationInterface[] = [];
    reservation_list.map((reservation) => {
      if (reservation['User'].user_id == user_id) {
        final_list.push(reservation);
      }
    });

    return final_list;
  }

  async deleteOneReservation(key: number, user: UserInterface) {
    //const resKey=Number(key)
    console.log(key, user);
    await this.prisma.reservation.update({
      where: {
        key,
        User: {
          user_id: user['user_id'],
        },
        version: { gte: this.POST_VERSION },
        deleted: false,
      },
      data: {
        deleted: true,
      },
    });

    return true;
  }

  async getReservationKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    let data: reservationIncrementKeyInterface | null =
      await this.prisma.reservationIncrementKey.findFirst({
        where: {
          version: { gte: this.RESERVATION_INCREMENTKEY_VERSION },
        },
      });
    if (!data) {
      data = await this.prisma.reservationIncrementKey.create({
        data: {
          reservationKey: await this.getReservationMaxKey(),
          version: this.RESERVATION_INCREMENTKEY_VERSION,
        },
      });
      if (!data)
        throw Error("[mongodb.service:getReservationKey] can't create data");
    }
    const updated: reservationIncrementKeyInterface =
      await this.prisma.reservationIncrementKey.update({
        where: {
          version: { gte: this.RESERVATION_INCREMENTKEY_VERSION },
          id: data.id,
        },
        data: { reservationKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.reservationKey;
  }

  async getReservationMaxKey() {
    const reservations: ReservationExportInterface[] =
      await this.prisma.reservation.findMany({});
    if (!reservations || reservations.length === 0) return 0;
    return reservations.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, reservations[0].key);
  }
}
