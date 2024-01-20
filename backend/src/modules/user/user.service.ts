import { Injectable } from '@nestjs/common';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import { MongodbUserService } from '../mongodb/mongodb.user.service';

@Injectable()
export class UserService {
  constructor(private userdb: MongodbUserService) {}

  async getAllUser() {
    const user = await this.userdb.getAllUser();
    const userExport = user.map((ele) => this.transformExport(ele));
    return userExport;
  }

  async getUserByKey(user_id: string) {
    const user = await this.userdb.getUserByKey(user_id);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async validateUser(user_id: string, password: string) {
    const user = await this.userdb.validateUser(user_id, password);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async createUser(data: UserCreateDto) {
    const user = await this.userdb.createUser(data);
    const exportUser = this.transformExport(user);
    return exportUser;
  }
  async deleteOneUser(user_id: string) {
    const res = await this.userdb.deleteOneUser(user_id);
    return res;
  }
  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const user = await this.userdb.putOneUser(user_id, putUserBody);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async filterUser(query: UserFilterDto) {
    const res = await this.userdb.filterUser(query);

    const ret = res.map((user) => this.transformExport(user));
    return ret;
  }

  transformExport(user: UserInterface): UserExportInterface {
    delete (user as { password?: string }).password;
    delete (user as { delete?: boolean }).delete;
    delete (user as { version?: number }).version;
    return user;
  }
}
