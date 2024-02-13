import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInterface } from '@/interface/user.interface';

import {
  RequestBase,
  RequestDeleteInterface,
  RequestExportInterface,
  RequestInterface,
} from '@/interface/request.interface';
import { requestIncrementKeyInterface } from '@/interface/incrementkey.interface';
import { RequestCreateDto } from '@/dto/request.dto';

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
        },
      });
    if (!result) {
      throw Error('[mongodb.service:getRequestByKey] result null');
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
    const res: RequestDeleteInterface = await this.prisma.requestForm.update({
      where: {
        key,
        version: { gte: this.REQUEST_VERSION },
        delete: false,
      },
      data: {
        delete: true,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:deleteOneRequest] request doesnt exist');
    }
    return true;
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
    const request: RequestExportInterface[] =
      await this.prisma.requestForm.findMany({});
    if (!request || request.length === 0) return 0;
    return request.reduce((prev, cur) => {
      return Math.max(prev, cur.key);
    }, request[0].key);
  }
}
