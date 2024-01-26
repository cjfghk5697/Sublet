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

  @UseGuards(LoggedInGuard)
  @Get()
  async getAllUser(@Req() req: customRequest) {
    console.log('[user.controller:getAllUser] starting function');
    return req.user;
  }

  @Get('filter')
  async filterUser(@Query() query: UserFilterDto) {
    console.log('[user.controller:filterUser] starting function');
    try {
      const res = await this.userService.filterUser(query);
      console.log('[user.controller:filterUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:filterUser] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get('profile')
  @UseGuards(LoggedInGuard)
  async getProfile(@Req() req: customRequest) {
    console.log('[user.controller:getProfile] starting function');
    console.log('[user.controller:getProfile] user_id: ', req.user);
    try {
      const res = await this.userService.getUserByKey(req.user.user_id);
      console.log('[user.controller:getProfile] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:getProfile] error: ', e);
      throw new NotFoundException();
    }
  }
  @Put('image')
  @UseGuards(LoggedInGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: customRequest,
  ) {
    console.log('[user.controller:uploadProfile] starting function');
    console.log('[user.controller:uploadProfile] putUserBody: ', req);

    if (!file) {
      console.log(
        "[user.controller:uploadProfile] file is empty, we're assuming bad request",
      );
      throw new BadRequestException();
    }
    try {
      const res = await this.userService.uploadProfile(req.user.user_id, file);
      console.log('[user.controller:uploadProfile] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:uploadProfile] error: ', e);
      throw new NotFoundException();
    }
  }
  @Get(':user_id')
  async getOneUser(@Param('user_id') user_id: string) {
    console.log('[user.controller:getOneUser] starting function');
    console.log('[user.controller:getOneUser] user_id: ', user_id);
    try {
      const res = await this.userService.getUserByKey(user_id);
      console.log('[user.controller:getOneUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:getOneUser] error: ', e);
      throw new NotFoundException();
    }
  }

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    console.log('[user.controller:createUser] starting function');
    console.log('[user.controller:createUser] data: ', data);
    try {
      const res = await this.userService.createUser(data);
      console.log('[user.controller:createUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:createUser] error: ', e);
      throw new BadRequestException();
    }
  }

  @Put(':user_id')
  @UseGuards(LoggedInGuard)
  async putOneUser(
    @Param('user_id') user_id: string,
    @Body() putUserBody: UserUpdateDto,
    @Req() req: customRequest,
  ) {
    console.log('[user.controller:putOneUser] starting function');
    console.log('[user.controller:putOneUser] user_id: ', user_id);
    console.log('[user.controller:putOneUser] putUserBody: ', putUserBody);
    if (req.user.user_id !== user_id) {
      console.log(
        '[user.controller:putOneUser] user_id is not same as req.user.user_id',
      );
      throw new UnauthorizedException();
    }
    try {
      const res = await this.userService.putOneUser(user_id, putUserBody);
      console.log('[user.controller:putOneUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:putOneUser] error: ', e);
      throw new NotFoundException();
    }
  }

  @Delete(':user_id')
  @UseGuards(LoggedInGuard)
  async deleteOneUser(
    @Param('user_id') user_id: string,
    @Req() req: customRequest,
    @Res() res: Response,
  ) {
    console.log('[user.controller:deleteOneUser] starting function');
    console.log('[user.controller:deleteOneUser] user_id: ', user_id);
    if (req.user.user_id !== user_id) {
      console.log(
        '[user.controller:deleteOneUser] user_id is not same as req.user.user_id',
      );
      throw new UnauthorizedException();
    }
    try {
      const ret = await this.userService.deleteOneUser(user_id);
      console.log('[user.controller:deleteOneUser] res: ', ret);
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
