import { Controller, Get, Req, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { userIdDto } from './dto/user.dto';
import { LoggedInGuard } from 'src/guards/logged-in.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LoggedInGuard)
  @Get()
  getAllUser(@Req() _req: Request) {
    return this.userService.getAllUser();
  }

  @Get(':id')
  getOneUser(@Param() params: userIdDto) {
    console.log(params);
    return this.userService.getUserById(params.id);
  }
}
