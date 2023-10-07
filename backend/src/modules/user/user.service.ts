import { Injectable } from '@nestjs/common';
import type { UserInfoDto } from './dto/user.dto'; //interface 삭제 및 Dto 사
import { MongodbService } from '../mongodb/mongodb.service';

@Injectable()
export class UserService {
  constructor(private db: MongodbService) {}

  async getAllUser(): Promise<UserInfoDto[]> {
    //전부 UserDto로 변경

    const u = await this.db.getAllUser();
    if (u['delete'] === true) return null;
    return (await u).map((ele) => {
      const { delete: _, ...user } = ele;
      return user;
    });
  }

  async getUserByKey(user_id: string): Promise<UserInfoDto> {
    const u = await this.db.getUserByKey(user_id);
    if (!u) return null;
    const { delete: _, ...user } = u;
    return await user;
  }

  async validateUser(id: string, pass: string): Promise<UserInfoDto> {
    const u = await this.db.validateUser(id);
    if (!u) return null;
    if (u['password'] === pass) {
      const { delete: _, ...user } = u;
      return user;
    }
    return null;
  }

  async createUser(data: UserInfoDto) {
    return await this.db.createUser(data);
  }
}
