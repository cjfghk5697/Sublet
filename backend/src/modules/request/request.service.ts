import { Injectable } from '@nestjs/common';
import { MongodbRequestService } from '../mongodb/mongodb.request.service';
import { RequestCreateDto } from '@/dto/request.dto';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import {
  RequestBase,
  RequestExportInterface,
  RequestId,
  RequestInterface,
} from '@/interface/request.interface';
import { UserService } from '../user/user.service';
import { PostExportInterface } from '@/interface/post.interface';
import { PostService } from '../post/post.service';

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
    const ret = res.map((ele) => this.transformExport(ele));
    return ret;
  }
  async getRequestByRequestId(id: RequestId) {
    const res = await this.db.getRequestByRequestId(id);
    const ret = res.map((ele) => this.transformExport(ele));
    return ret;
  }

  async deleteOneRequest(key: number) {
    const res = await this.db.deleteOneRequest(key);
    return res;
  }
  async putOneRequest(key: number, data: RequestBase) {
    const res = await this.db.putOneRequest(data, key);
    const ret = this.transformExport(res);
    return ret;
  }
  async putOnePostRequest(request_key: number, post_key: number) {
    const res = await this.db.putOnePostRequest(post_key, request_key);
    const ret = this.transformExport(res);
    return ret;
  }

  transformExport(request: RequestInterface): RequestExportInterface {
    delete (request as { id?: string }).id;
    delete (request as { delete?: boolean }).delete;
    (request as { user: UserExportInterface }).user =
      UserService.transformExport(request.user);
    (request as { post: PostExportInterface[] }).post = request.post.map(
      (ele) => PostService.transformExport(ele),
    );
    return request;
  }
}
