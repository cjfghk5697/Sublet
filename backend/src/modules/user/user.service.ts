import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private db: MongodbService) {}

  async getAllUser() {
    const user = await this.db.getAllUser();
    const userExport = user.map((ele) => this.transformExport(ele));
    return userExport;
  }

  async getUserByKey(user_id: string) {
    const user = await this.db.getUserByKey(user_id);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async validateUser(user_id: string, password: string) {
    const user = await this.db.validateUser(user_id, password);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async createUser(data: UserCreateDto) {
    const user = await this.db.createUser(data);
    const exportUser = this.transformExport(user);
    return exportUser;
  }
  async deleteOneUser(user_id: string) {
    const res = await this.db.deleteOneUser(user_id);
    return res;
  }
  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const user = await this.db.putOneUser(user_id, putUserBody);
    const exportUser = this.transformExport(user);
    return exportUser;
  }

  async filterUser(query: UserFilterDto) {
    const res = await this.db.filterUser(query);

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
