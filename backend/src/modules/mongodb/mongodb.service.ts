import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class MongodbService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts(): Promise<Post[]> {
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

  async createPost(data: Prisma.PostCreateInput) {
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
}
