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
} from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from '@/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async getAllUser() {
    console.log('[user.controller:getAllUser] starting function');
    try {
      const res = await this.userService.getAllUser();
      console.log('[user.controller:getAllUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:getAllUser] error: ', e);
      return { ok: false };
    }
  }

  @Get(':user_id')
  async getOneUser(@Param('user_id') user_id: string) {
    try {
      console.log('[user.controller:getOneUser] starting function');
      console.log('[user.controller:getOneUser] user_id: ', user_id);
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
    try {
      console.log('[user.controller:createUser] starting function');
      console.log('[user.controller:createUser] data: ', data);
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
  ) {
    try {
      console.log('[user.controller:putOneUser] starting function');
      console.log('[user.controller:putOneUser] user_id: ', user_id);
      console.log('[user.controller:putOneUser] putUserBody: ', putUserBody);
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
  async deleteOneUser(@Param('user_id') user_id: string) {
    try {
      console.log('[user.controller:deleteOneUser] starting function');
      console.log('[user.controller:deleteOneUser] user_id: ', user_id);
      const res = await this.userService.deleteOneUser(user_id);
      console.log('[user.controller:deleteOneUser] res: ', res);
      return res;
    } catch (e) {
      console.log('[user.controller:deleteOneUser] error: ', e);
      throw new NotFoundException();
    }
  }
}
