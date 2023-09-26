import { Injectable } from '@nestjs/common';
import type { UserCreateDto } from './dto/user.dto'; //interface 삭제 및 Dto 사
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUser(): Promise<UserCreateDto[]> {
    //전부 UserDto로 변경
    return await this.prisma.user.findMany();
  }

  async getUserByKey(user_id: string): Promise<UserCreateDto> {
    return await this.prisma.user.findFirst({
      where: {
        user_id: user_id,
      },
    });
  }

  async validateUser(id: string, pass: string): Promise<UserCreateDto> {
    console.log(id, pass);

    const u = await this.prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
    console.log(u, u['password']);
    if (!u) return await null;
    if (u['password'] === pass) return await u;
    return await null;
  }

  async createUser(data: UserCreateDto) {
    try {
      return await this.prisma.user.create({
        data: { ...data },
      });
    } catch (e) {
      throw e;
    }
  }
}
