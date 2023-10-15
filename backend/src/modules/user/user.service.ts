import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { UserCreateDto } from '@/dto/user.dto';

@Injectable()
export class UserService {
  constructor(private db: MongodbService) {}

  async getAllUser() {
    //전부 UserDto로 변경
    const user = await this.db.getAllUser();
    const userExport = user.map((ele) => this.transformExport(ele));
    return userExport;
  }

  async getUserByKey(user_id: string) {
    const user = await this.db.getUserByKey(user_id);
    return this.transformExport(user);
  }

  async validateUser(user_id: string, password: string) {
    const user = await this.db.validateUser(user_id, password);
    return this.transformExport(user);
  }

  async createUser(data: UserCreateDto) {
    const user = await this.db.createUser(data);
    return this.transformExport(user);
  }

  transformExport(user: UserInterface): UserExportInterface {
    delete (user as { phone?: string }).phone;
    delete (user as { password?: string }).password;
    delete (user as { delete?: boolean }).delete;
    return user;
  }
}
