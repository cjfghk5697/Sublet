import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  PostCreateDto,
  PostGetAllQueryDto,
  PrismaPostCreateDto,
} from '@/dto/post.dto';
import { PostInterface } from '@/interface/post.interface';

@Injectable()
export class MongodbService {
  constructor(private prisma: PrismaService) {}

  isPositiveInt(val: number, defaultVal: number) {
    if (typeof val !== 'number') return defaultVal;
    if (!Number.isInteger(val)) return defaultVal;
    if (val <= 0) return defaultVal;
    return val;
  }

  async getAllPosts(query: PostGetAllQueryDto) /*: Promise<PostInterface[]>*/ {
    query.maxPost = this.isPositiveInt(query.maxPost, 6);
    if (query.maxPost > 50) query.maxPost = 6;
    query.page = this.isPositiveInt(query.page, 1);

    const posts = await this.prisma.post.findMany();

    return posts.slice(
      query.maxPost * (query.page - 1),
      query.maxPost * query.page,
    );
  }

  async getPostKey(): Promise<number> {
    const data = await this.prisma.incrementKey.findFirst();
    if (!data) throw new Error('document doesnt exist');
    const updated = await this.prisma.incrementKey.update({
      where: {
        id: data.id,
      },
      data: { postKey: { increment: 1 } },
    });
    return updated.postKey;
  }

  async createPost(data: PrismaPostCreateDto) {
    const postuser = await this.prisma.user.findFirst();
    if (!postuser) throw new Error('user not exist');

    data.postuser = postuser;

    return await this.prisma.post.create({
      data: {
        key: await this.getPostKey(),
        ...data,
        postuser: {
          connect: {
            user_id: 'asdf',
          },
        },
      },
    });
  }

  async getOnePost(key: number) {
    return this.prisma.post.findFirst({
      where: {
        key,
      },
    });
  }

  async saveImage(filename: string, filetype: string) {
    const res = await this.prisma.image.create({
      data: {
        filename,
        filetype,
      },
    });
    return res;
  }
}
