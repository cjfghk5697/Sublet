import {
  Controller,
  Get,
  Req,
  Param,
  UseGuards,
  NotFoundException,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LoggedInGuard } from '../../guards/logged-in.guard';
import { UserInfoDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  async getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':user_id')
  async getOneUser(@Param('user_id') user_id: string) {
    const res = await this.userService.getUserByKey(user_id);
    if (!res) {
      throw new NotFoundException();
    }
    return res;
  }

  @Post()
  async createUser(@Body() data: UserInfoDto) {
    try {
      return await this.userService.createUser(data);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
