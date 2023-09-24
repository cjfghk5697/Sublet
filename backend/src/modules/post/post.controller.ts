import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PostCreateDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { ImageInterface } from '@/interface/image.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPosts(@Query() query: PostGetAllQueryDto) {
    try {
      const res = await this.postService.getAllPosts(query);
      return res;
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
    @Req() req: Express.Request,
  ) {
    try {
      if (!req.user) throw new UnauthorizedException();
      const res = await this.postService.createPost(file, data, req.user);
      return res;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Get(':postKey')
  async getOnePost(@Param('postKey') key: number) {
    try {
      const res = await this.postService.getOnePost(key);
      return res;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Put(':postKey')
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async PutOnePost(
    @Param('postKey') key: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() putPostBody: PostUpdateDto,
  ) {
    try {
      if (Object.keys(putPostBody).length == 0) throw new BadRequestException();
      const res = await this.postService.putOnePost(key, files, putPostBody);
      return res;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  @Delete(':postKey')
  @UseGuards(LoggedInGuard)
  async DeleteOnePost(
    @Param('postKey') key: number,
    @Req() req: Express.Request,
  ) {
    try {
      if (!req.user) throw new UnauthorizedException();
      const res = await this.postService.deleteOnePost(key, req.user);
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
