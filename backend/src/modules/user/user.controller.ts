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
    try {
      return this.userService.getAllUser();
    } catch (e) {
      return { ok: false };
    }
  }

  @Get(':user_id')
  async getOneUser(@Param('user_id') user_id: string) {
    try {
      const res = await this.userService.getUserByKey(user_id);
      return res;
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Post()
  async createUser(@Body() data: UserCreateDto) {
    try {
      return await this.userService.createUser(data);
    } catch (e) {
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
      return await this.userService.putOneUser(user_id, putUserBody);
    } catch (e) {
      throw new NotFoundException();
    }
  }

  @Delete(':user_id')
  @UseGuards(LoggedInGuard)
  async deleteOneUser(@Param('user_id') user_id: string) {
    try {
      return await this.userService.deleteOneUser(user_id);
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
