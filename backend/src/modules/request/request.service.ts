import { Injectable } from '@nestjs/common';
import { MongodbRequestService } from '../mongodb/mongodb.request.service';
import { RequestCreateDto } from '@/dto/request.dto';
import { UserInterface } from '@/interface/user.interface';
import { RequestBase, RequestId } from '@/interface/request.interface';

@Injectable()
export class RequestService {
  constructor(private db: MongodbRequestService) {}

  async createRequest(data: RequestCreateDto, user: UserInterface) {
    const res = await this.db.createRequest(data, user);
    if (!res) {
      throw new Error('[reservation.service:createRequest] createRequest fail');
    }
    return res;
  }

  async getRequestByUserKey(user_id: string) {
    const res = await this.db.getRequestByUserKey(user_id);
    return res;
  }
  async getRequestByRequestId(id: RequestId) {
    const res = await this.db.getRequestByRequestId(id);
    return res;
  }

  async deleteOneRequest(key: number) {
    const res = await this.db.deleteOneRequest(key);
    return res;
  }
  async putOneRequest(key: number, data: RequestBase) {
    const res = await this.db.putOneRequest(data, key);
    return res;
  }
  async putOnePostRequest(request_key: number, post_key: number) {
    const res = await this.db.putOnePostRequest(post_key, request_key);
    return res;
  }
}
