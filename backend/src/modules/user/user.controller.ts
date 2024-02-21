import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Post,
  Put,
  Delete,
  Body,
  BadRequestException,
  UnauthorizedException,
  Req,
  Res,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { UserService } from './user.service';
import { UserCreateDto, UserFilterDto, UserUpdateDto } from '@/dto/user.dto';
import { customRequest } from '@/interface/user.interface';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put('image')
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: customRequest,
  ) {
    if (!file) {
      console.log(
        "[user.controller:uploadProfile] file is empty, we're assuming bad request",
      );
      throw new BadRequestException();
    }
    try {
      const res = await this.userService.uploadProfile(req.user.user_id, file);
      return res;
    } catch (e) {
      console.log('[user.controller:uploadProfile] error: ', e);
      throw new NotFoundException();
    }
  }
  @UseGuards(LoggedInGuard)
  @Get()
  async getAllUser(@Req() req: customRequest) {
    return req.user;
  }

  @Get('filter')
  async filterUser(@Query() query: UserFilterDto) {
    try {
      const res = await this.userService.filterUser(query);
      return res;
    } catch (e) {
      console.log('[user.controller:filterUser] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get('profile')
  @UseGuards(LoggedInGuard)
  async getProfile(@Req() req: customRequest) {
    try {
      const res = await this.userService.getUserByKey(req.user.user_id);
      return res;
    } catch (e) {
      console.log('[user.controller:getProfile] error: ', e);
      throw new NotFoundException();
    }
  }

  @Get('post')
  async getUserPost(@Req() req: customRequest) {
    try {
      const res = await this.userService.getUserPostByKey(req.user.user_id);
      return res;
    } catch (e) {
      console.log('[user.controller:getUserPost] error: ', e);
      throw new NotFoundException();
    }
  }

  @Put('update')
  @UseGuards(LoggedInGuard)
  async putOneUser(
    @Body() putUserBody: UserUpdateDto,
    @Req() req: customRequest,
  ) {
    try {
      const res = await this.userService.putOneUser(
        req.user.user_id,
        putUserBody,
      );
      return res;
    } catch (e) {
      console.log('[user.controller:putOneUser] error: ', e);
      throw new NotFoundException();
    }
  }

  @Get(':user_id')
  async getOneUser(@Param('user_id') user_id: string) {
    try {
      const res = await this.userService.getUserByKey(user_id);
      return res;
    } catch (e) {
      console.log('[user.controller:getOneUser] error: ', e);
      throw new NotFoundException();
    }
  }

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    try {
      const res = await this.userService.createUser(data);
      return res;
    } catch (e) {
      console.log('[user.controller:createUser] error: ', e);
      throw new BadRequestException();
    }
  }

  @Delete(':user_id')
  @UseGuards(LoggedInGuard)
  async deleteOneUser(
    @Param('user_id') user_id: string,
    @Req() req: customRequest,
    @Res() res: Response,
  ) {
    if (req.user.user_id !== user_id) {
      console.log(
        '[user.controller:deleteOneUser] user_id is not same as req.user.user_id',
      );
      throw new UnauthorizedException();
    }
    try {
      await this.userService.deleteOneUser(user_id);
      req.logOut(function (err) {
        //middleware에 function은 err. req,res,next가 들어갈수 있다.
        if (err) {
          throw new Error();
        }
        res.send({ ok: true });
      });
    } catch (e) {
      console.log('[user.controller:deleteOneUser] error: ', e);
      throw new NotFoundException();
    }
  }
}
