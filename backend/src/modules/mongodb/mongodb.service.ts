import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateDto } from '../post/dto/post.dto';
import { UserCreateDto } from '../user/dto/user.dto';
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
    return this.prisma.post.findFirst({
      where: {
        key,
      },
    });
  }

 //User------------------------------------------------------------
 async createUser(data: UserCreateDto) {
    try {
      return await this.prisma.user.create({
        data:{ ...data }
      });
    } catch (e) {
      throw e;
    }
  }

  async getOneUser(input_id: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        user_id: input_id,
      },
    });
  }





}
