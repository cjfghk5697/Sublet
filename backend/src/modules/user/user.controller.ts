import { Controller, Get, Req, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { LoggedInGuard } from '../../guards/logged-in.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //@UseGuards(LoggedInGuard)
  @Get()
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get(':user_id')
  getOneUser(@Param('user_id') user_id: string) {
    return this.userService.getUserByKey(user_id);
  }


}
