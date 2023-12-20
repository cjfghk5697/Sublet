import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserTagFilterDto, UserUpdateDto } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private db: MongodbService) {}

  async getAllUser() {
    console.log('[user.service:getAllUser] starting function');
    const user = await this.db.getAllUser();
    console.log('[user.service:getAllUser] user: ', user);
    const userExport = user.map((ele) => this.transformExport(ele));
    console.log('[user.service:getAllUser] returning function');
    return userExport;
  }

  async getUserByKey(user_id: string) {
    console.log('[user.service:getUserByKey] starting function');
    console.log('[user.service:getUserByKey] user_id: ', user_id);
    const user = await this.db.getUserByKey(user_id);
    console.log('[user.service:getUserByKey] user: ', user);
    const exportUser = this.transformExport(user);
    console.log('[user.service:getUserByKey] returning function');
    return exportUser;
  }

  async validateUser(user_id: string, password: string) {
    console.log('[user.service:validateUser] starting function');
    console.log('[user.service:validateUser] user_id: ', user_id);
    console.log('[user.service:validateUser] password: ', password);
    const user = await this.db.validateUser(user_id, password);
    console.log('[user.service:validateUser] user: ', user);
    const exportUser = this.transformExport(user);
    console.log('[user.service:validateUser] returning function');
    return exportUser;
  }

  async createUser(data: UserCreateDto) {
    console.log('[user.service:createUser] starting function');
    console.log('[user.service:createUser] data: ', data);
    const user = await this.db.createUser(data);
    console.log('[user.service:createUser] user: ', user);
    const exportUser = this.transformExport(user);
    console.log('[user.service:createUser] returning function');
    return exportUser;
  }
  async deleteOneUser(user_id: string) {
    console.log('[user.service:deleteOneUser] starting function');
    console.log('[user.service:deleteOneUser] user_id: ', user_id);
    const user = await this.db.deleteOneUser(user_id);
    console.log('[user.service:deleteOneUser] user: ', user);
    const exportUser = this.transformExport(user);
    console.log('[user.service:deleteOneUser] returning function');
    return exportUser;
  }
  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    console.log('[user.service:putOneUser] starting function');
    console.log('[user.service:putOneUser] user_id: ', user_id);
    console.log('[user.service:putOneUser] putUserBody: ', putUserBody);
    const user = await this.db.putOneUser(user_id, putUserBody);
    console.log('[user.service:putOneUser] user: ', user);
    const exportUser = this.transformExport(user);
    console.log('[user.service:putOneUser] returning function');
    return exportUser;
  }

  async filterUser(query: UserTagFilterDto) {
    console.log('[user.servuce:filterUser] starting function');
    console.log('[user.servuce:filterUser] query: ', query);
    const res = await this.db.filterUser(query);
    console.log('[user.servuce:filterUser] res: ', res);

    const ret = res.map((user) => this.transformExport(user));
    console.log('[user.servuce:filterUser] returning function');
    return ret;
  }

  transformExport(user: UserInterface): UserExportInterface {
    delete (user as { phone?: string }).phone;
    delete (user as { password?: string }).password;
    delete (user as { delete?: boolean }).delete;
    return user;
  }
}
