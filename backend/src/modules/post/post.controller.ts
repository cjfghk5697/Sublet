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
import { PostInterface } from '@/interface/post.interface';
import { ImageInterface } from '@/interface/image.interface';

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
  @UseInterceptors(FilesInterceptor('images')) // 여러 파일들을 받을 수 있도록 FilesInterceptor 사용
  async createPost(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() data: PostCreateDto,
  ) {
    try {
      const res = await this.postService.createPost(file, data);
      return res;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get(':postKey')
  async getOnePost(@Param('postKey') key: number) {
    try {
      const res: PostInterface = await this.postService.getOnePost(key);
      return res;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @UseGuards(LoggedInGuard)
  @Put(':postKey')
  async PutOnePost(@Param('postKey') key: number) {
    try {
      const res = await this.postService.putOnePost(key);
      return res;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async PostImage(@UploadedFile() file: Express.Multer.File) {
    try {
      const res: ImageInterface = await this.postService.uploadImage(file);
      return { res: res.id };
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
