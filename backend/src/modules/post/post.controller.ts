import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
  UploadedFiles,
} from '@nestjs/common';
import { PostCreateDto, PostGetAllQueryDto } from '../../dto/post.dto';
import { LoggedInGuard } from '../../guards/logged-in.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { Express } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(@Query() query: PostGetAllQueryDto) {
    try {
      return await this.postService.getAllPosts(query);
    } catch (e) {
      throw new BadRequestException('cannot get all posts');
    }
  }

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createPost(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() data: PostCreateDto,
  ) {
    try {
      return await this.postService.createPost(file, data);
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get(':key')
  async getOnePost(@Param('key') key: number) {
    const res = await this.postService.getOnePost(key);
    if (!res) throw new NotFoundException();
    return res;
  }

  @UseGuards(LoggedInGuard)
  @Put(':key')
  async PutOnePost(@Param('key') key: number) {
    console.log('put post, key=', key);
    const res = await this.postService.getOnePost(key);
    return { result: 'found post' };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async PostImage(@UploadedFile() file: Express.Multer.File) {
    const res = await this.postService.uploadImage(file);
    return { res: res.id };
  }
}
