import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateDto } from '../post/dto/post.dto';
import { UserInfoDto, UserCreateDto } from '../user/dto/user.dto';
import { PostInterface } from '../post/interface/post.interface';

@Injectable()
export class MongodbService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(): Promise<PostInterface[]> {
    return this.prisma.post.findMany();
  }

  async getPostKey(): Promise<number> {
    const data = await this.prisma.incrementKey.findFirst();
    const updated = await this.prisma.incrementKey.update({
      where: {
        id: data.id,
      },
      data: { postKey: { increment: 1 } },
    });
    return updated.postKey;
  }

  async createPost(data: PostCreateDto) {
    try {
      data['end_day'] = new Date(data['end_day']);
      data['start_day'] = new Date(data['start_day']);

      return await this.prisma.post.create({
        data: {
          key: await this.getPostKey(),
          ...data,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  async getOnePost(key: number) {
    try {
      return await this.prisma.post.findFirst({
        where: {
          key,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  // user
  async getAllUser(): Promise<UserCreateDto[]> {
    //전부 UserDto로 변경
    const u = await this.prisma.user.findMany();
    return u;
  }

  async getUserByKey(user_id: string): Promise<UserCreateDto> {
    return await this.prisma.user.findFirst({
      where: {
        user_id: user_id,
      },
    });
  }

  async createUser(data: UserInfoDto) {
    try {
      return await this.prisma.user.create({
        data: { ...data },
      });
    } catch (e) {
      throw e;
    }
  }

  async validateUser(id: string): Promise<UserCreateDto> {
    return await this.prisma.user.findFirst({
      where: {
        user_id: id,
      },
    });
  }
}
