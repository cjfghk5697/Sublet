import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInterface } from '@/interface/user.interface';

import {
  RequestBase,
  RequestExportInterface,
  RequestId,
  RequestInterface,
} from '@/interface/request.interface';
import { requestIncrementKeyInterface } from '@/interface/incrementkey.interface';
import { RequestCreateDto, requestKey } from '@/dto/request.dto';

@Injectable()
export class MongodbRequestService {
  REQUEST_VERSION = 1;
  REQUEST_INCREMENTKEY_VERSION = 1;
  constructor(private prisma: PrismaService) {}
  async getRequestByUserKey(user_id: string) {
    const result: RequestInterface[] | null =
      await this.prisma.requestForm.findMany({
        where: {
          version: {
            gte: this.REQUEST_VERSION,
          },
          User: { user_id: user_id },
          delete: false,
        },
        include: {
          User: true,
          Post: true,
        },
      });
    if (!result) {
      throw Error('[mongodb.service:getRequestByKey] result null');
    }
    return result;
  }

  async getRequestByRequestId(id: RequestId) {
    const result: RequestInterface[] | null =
      await this.prisma.requestForm.findMany({
        where: {
          id: { in: id.id },
          version: {
            gte: this.REQUEST_VERSION,
          },
          delete: false,
        },
        include: {
          User: true,
          Post: true,
        },
      });
    if (!result) {
      throw Error('[mongodb.service:getRequestByRequestId] result null');
    }
    return result;
  }
  async createRequest(data: RequestCreateDto, user: UserInterface) {
    const result: RequestBase = await this.prisma.requestForm.create({
      data: {
        ...data,
        User: {
          connect: {
            user_id: user.user_id,
          },
        },
        version: this.REQUEST_VERSION,
        key: await this.getRequestKey(),
      },
    });
    if (!result) {
      throw Error('[mongodb.service:createRequest] result null');
    }
    return result;
  }

  async deleteOneRequest(key: number) {
    const res: RequestInterface | null = await this.prisma.requestForm.update({
      where: {
        key,
        version: { gte: this.REQUEST_VERSION },
        delete: false,
      },
      data: {
        delete: true,
      },
      include: {
        User: true,
        Post: true,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:deleteOneRequest] request doesnt exist');
    }
    return true;
  }

  async putOneRequest(data: RequestBase, key: number) {
    const res: RequestInterface | null = await this.prisma.requestForm.update({
      where: {
        key,
        version: { gte: this.REQUEST_VERSION },
        delete: false,
      },
      data: {
        ...data,
      },
      include: {
        User: true,
        Post: true,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:putOneRequest] request doesnt exist');
    }
    return res;
  }

  async putOnePostRequest(post_key: number, request_key: number) {
    const res: RequestBase | null = await this.prisma.requestForm.update({
      where: {
        key: request_key,
        version: { gte: this.REQUEST_VERSION },
        delete: false,
      },
      data: {
        Post: {
          connect: {
            key: post_key,
          },
        },
      },
    });
    if (!res) {
      throw Error('[mongodb.service:putOneRequest] request doesnt exist');
    }
    return res;
  }

  async getRequestKey() {
    // incrementKey 테이블의 첫 번째 데이터를 가져옴
    let data: requestIncrementKeyInterface | null =
      await this.prisma.requestIncrementKey.findFirst({
        where: {
          version: { gte: this.REQUEST_INCREMENTKEY_VERSION },
        },
      });
    if (!data) {
      data = await this.prisma.requestIncrementKey.create({
        data: {
          requestKey: await this.getRequestMaxKey(),
          version: this.REQUEST_INCREMENTKEY_VERSION,
        },
      });
      if (!data)
        throw Error("[mongodb.service:getRequestKey] can't create data");
    }
    const updated: requestIncrementKeyInterface =
      await this.prisma.requestIncrementKey.update({
        where: {
          version: { gte: this.REQUEST_INCREMENTKEY_VERSION },
          id: data.id,
        },
        data: { requestKey: { increment: 1 } },
      });

    // 증가된 postKey 값을 전달
    return updated.requestKey;
  }

  async getRequestMaxKey() {
    const request: requestKey[] = await this.prisma.requestForm.findMany({});
    if (!request || request.length === 0) return 0;
    return request.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, request[0].key);
  }
}
