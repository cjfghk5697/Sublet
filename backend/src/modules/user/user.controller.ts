import {
  Controller,
  Get,
  Param,
  UseGuards,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LoggedInGuard } from '@/guards/logged-in.guard';
import { UserService } from './user.service';
import { UserCreateDto } from '@/dto/user.dto';

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
}
