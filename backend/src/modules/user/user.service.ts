import { Injectable } from '@nestjs/common';
import type { UserCreateDto, UserInfoDto } from './dto/user.dto'; //interface 삭제 및 Dto 사
import { MongodbService } from '../mongodb/mongodb.service';

@Injectable()
export class UserService {
  constructor(private db: MongodbService) {}

  async getAllUser(): Promise<UserInfoDto[]> {
    //전부 UserDto로 변경
    return await this.db.getAllUser();
  }

  async getUserByKey(user_id: string): Promise<UserInfoDto> {
    return this.db.getUserByKey(user_id);
  }

  async validateUser(id: string, pass: string): Promise<UserCreateDto> {
    return await this.db.validateUser(id, pass);
  }

  async createUser(data: UserCreateDto) {
    return await this.db.createUser(data);
  }
}
