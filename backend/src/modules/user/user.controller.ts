import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedInGuard } from '../../guards/logged-in.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':key')
  getOneUser(@Param('key') key: number) {
    return this.userService.getUserByKey(key);
  }
}
