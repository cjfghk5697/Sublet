import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserInterface } from '@/interface/user.interface';
import {
  UserCreateDto,
  UserFilterDto,
  UserLoginDto,
  UserTokenVerifyUpdateDto,
  UserUpdateDto,
  UserVerifyUpdateDto,
} from '@/dto/user.dto';

import * as bcrypt from 'bcrypt';
import { PostInterface } from '@/interface/post.interface';

@Injectable()
export class MongodbUserService {
  USER_VERSION = 2;
  POST_VERSION = 1;

  constructor(private prisma: PrismaService) {}

  async getOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.findFirstOrThrow({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    return res;
  }

  async getAllUser() {
    const u: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: {
          gte: this.USER_VERSION,
        },
      },
    });
    return u;
  }

  async getUserByKey(user_id: string) {
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: {
          gte: this.USER_VERSION,
        },
        delete: false,
      },
    });
    if (!result) {
      throw Error('[mongodb.service:getUserByKey] result null');
    }
    return result;
  }

  async getUserPostByKey(user_id: string) {
    const result: PostInterface[] = await this.prisma.post.findMany({
      where: {
        version: { gte: this.POST_VERSION },

        postuser: { user_id: user_id },
        deleted: false,
        local_save: false,
      },
      include: {
        postuser: true,
      },
    });

    if (!result) {
      throw Error('[mongodb.service:getUserPostByKey] result null');
    }
    return result;
  }

  async createUser(data: UserCreateDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    data.password = hashPassword;
    data.birth = new Date(data.birth);
    const result: UserInterface = await this.prisma.user.create({
      data: { ...data, version: this.USER_VERSION },
    });
    if (!result) {
      throw Error('[mongodb.service:createUser] result null');
    }
    return result;
  }

  async validateUser(user_id: string, password: string) {
    const result: UserInterface | null = await this.prisma.user.findFirst({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
    });

    const password_result = await bcrypt.compare(password, result!.password);
    if (!result || !password_result) {
      throw Error(
        '[mongodb.service:validateUser] user_id or password is wrong',
      );
    }
    return result;
  }

  async putOneUser(user_id: string, putUserBody: UserUpdateDto) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      throw Error('[mongodb.service:putOneUser] user doesnt exist');
    }
    return res;
  }

  async putChangePassword(putUserBody: UserLoginDto) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(putUserBody.password, salt);
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id: putUserBody.id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: { password: hashPassword },
    });
    if (!res) {
      throw Error('[mongodb.service:putChangePassword] user doesnt exist');
    }
    return res;
  }

  async putVerifyUser(user_id: string, putUserBody: UserVerifyUpdateDto) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: putUserBody,
    });
    if (!res) {
      throw Error('[mongodb.service:putVerifyUser] user doesnt exist');
    }
    return res;
  }

  async deleteOneUser(user_id: string) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: {
        delete: true,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:deleteOneUser] user doesnt exist');
    }
    return true;
  }

  async filterUser(query: UserFilterDto) {
    const res: UserInterface[] = await this.prisma.user.findMany({
      where: {
        version: { gte: this.USER_VERSION },
        school: query.school,
      },
    });
    return res;
  }

  async verifyUser(user_id: string, putUserBody: UserTokenVerifyUpdateDto) {
    const res: UserInterface = await this.prisma.user.update({
      where: {
        user_id: user_id,
        version: { gte: this.USER_VERSION },
        delete: false,
      },
      data: {
        verify_email: putUserBody.verify_email,
        verify_phone: putUserBody.verify_phone,
      },
    });
    if (!res) {
      throw Error('[mongodb.service:verifyUser] user doesnt exist');
    }
    return res;
  }
}
