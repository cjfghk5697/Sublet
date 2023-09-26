import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../../guards/local.guard';
import { LoggedInGuard } from '../../guards/logged-in.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login() {
    return { ok: true };
  }

  // @UseGuards(LoggedInGuard)
  // @UseGuards(LocalGuard)
  // @Post('logout')
  // async logout(@Req() req) {
  //   req.logOut();
  //   console.log('logout');
  // }
}
