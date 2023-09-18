import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { Prisma } from '@prisma/client';

@Controller('post')
export class PostController {
  constructor(private readonly db: MongodbService) {}

  @Get()
  async getAllPosts() {
    return this.db.getAllPosts();
  }

  @Post()
  async createPost(@Body() data: Prisma.PostCreateInput) {
    console.log('data:', data);
    return this.db.createPost(data);
  }

  @Get(':key')
  async getOnePost(@Param('key') key: number) {
    console.log('key=', key, ', type=', typeof key);
    const res = await this.db.getOnePost(key);
    if (!res) {
      console.log('res is empty,', res);
      throw new NotFoundException();
    }
    console.log('res found,', res);
    return res;
  }
}
