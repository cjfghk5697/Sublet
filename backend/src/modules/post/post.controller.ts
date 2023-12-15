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
  PostFilterQueryDto,
  PostGetAllQueryDto,
  PostUpdateDto,
} from '@/dto/post.dto';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { ImageInterface } from '@/interface/image.interface';
import { customRequest } from '@/interface/user.interface';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('filter')
  async filterPost(@Query() query: PostFilterQueryDto) {
    console.log('[post.controller:filterPost] starting function');
    try {
      const res = await this.postService.filterPost(query);
      console.log('[post.controller:filterPost] res: ', res);
      return res;
    } catch (e) {
      console.log('[post.controller:filterPost] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get()
  async getAllPosts(@Query() query: PostGetAllQueryDto) {
    console.log('[post.controller:getAllPosts] starting function');
    console.log('[post.controller:getAllPosts] query: ', query);
    try {
      const res = await this.postService.getAllPosts(query);
      console.log('[post.controller:getAllPosts] res: ', res);
      return res;
    } catch (e) {
      console.log('[post.controller:getAllPosts] error: ', e);
      throw new BadRequestException('cannot get all posts');
    }
  }

  @Post()
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FilesInterceptor('images')) // 여러 파일들을 받을 수 있도록 FilesInterceptor 사용
  async createPost(
    @UploadedFiles() file: Express.Multer.File[],
    @Body() data: PostCreateDto,
    @Req() req: customRequest,
  ) {
    console.log('[post.controller:createPost] starting function');
    console.log('[post.controller:createPost] file: ', file);
    console.log('[post.controller:createPost] data: ', data);
    console.log('[post.controller:createPost] req.user: ', req.user);
    if (!req.user) {
      console.log("[post.controller:createPost] req.user doesn't exist");
      throw new UnauthorizedException();
    }
    if (file.length == 0) {
      console.log(
        "[post.controller:createPost] file is empty, we're assuming bad request",
      );
      throw new BadRequestException();
    }
    try {
      const res = await this.postService.createPost(file, data, req.user);
      console.log('[post.controller:createPost] res: ', res);
      return res;
    } catch (e) {
      console.log('[post.controller:createPost] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get(':postKey')
  async getOnePost(@Param('postKey') key: number) {
    console.log('[post.controller:getOnePost] starting function');
    console.log('[post.controller:getOnePost] key: ', key);
    try {
      const res = await this.postService.getOnePost(key);
      console.log('[post.controller:getOnePost] res: ', res);
      return res;
    } catch (e) {
      console.log('[post.controller:getOnePost] error: ', e);
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
    @Req() req: customRequest,
  ) {
    console.log('[post.controller:PutOnePost] starting function');
    console.log('[post.controller:PutOnePost] key: ', key);
    console.log('[post.controller:PutOnePost] files: ', files);
    console.log('[post.controller:PutOnePost] putPostBody: ', putPostBody);
    if (Object.keys(putPostBody).length == 0) {
      console.log(
        '[post.controller:PutOnePost] putPostBody is empty, bad request',
      );
      throw new BadRequestException();
    }
    try {
      const post = await this.postService.getOnePost(key);
      console.log('[post.controller:PutOnePost] post: ', post);
      if (post.postuser_id !== req.user.id) {
        console.log('[post.controller:PutOnePost] the user did not post');
        throw new UnauthorizedException();
      }
      const res = await this.postService.putOnePost(key, files, putPostBody);
      console.log('[post.controller:PutOnePost] res: ', res);
      return res;
    } catch (e) {
      console.log('[post.controller:PutOnePost] error: ', e);
      if (e instanceof UnauthorizedException) throw e;
      throw new BadRequestException();
    }
  }

  @Delete(':postKey')
  @UseGuards(LoggedInGuard)
  async DeleteOnePost(
    @Param('postKey') key: number,
    @Req() req: customRequest,
  ) {
    console.log('[post.controller:DeleteOnePost] starting function');
    console.log('[post.controller:DeleteOnePost] key: ', key);
    console.log('[post.controller:DeleteOnePost] req.user: ', req.user);
    if (!req.user) {
      console.log("[post.controller:DeleteOnePost] req.user doesn't exist");
      throw new UnauthorizedException();
    }
    try {
      const res = await this.postService.deleteOnePost(key, req.user);
      console.log('[post.controller:DeleteOnePost] res: ', res);
      return { ok: res };
    } catch (e) {
      console.log('[post.controller:DeleteOnePost] error: ', e);
      throw new BadRequestException();
    }
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async PostImage(@UploadedFile() file: Express.Multer.File) {
    console.log('[post.controller:PostImage] starting function');
    console.log('[post.controller:PostImage] file: ', file);
    try {
      const res: ImageInterface = await this.postService.uploadImage(file);
      console.log('[post.controller:PostImage] res: ', res);
      return { res: res.id };
    } catch (e) {
      console.log('[post.controller:PostImage] error: ', e);
      throw new BadRequestException();
    }
  }
}
