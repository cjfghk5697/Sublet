import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { PostCreateDto } from './dto/post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly db: MongodbService) {}

  @Get()
  async getAllPosts() {
    return this.db.getAllPosts();
  }

  @Post()
  async createPost(@Body() data: PostCreateDto) {
    console.log('data:', data);
    try {
      return await this.db.createPost(data);
    } catch (e) {
      throw new BadRequestException();
    }
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
