import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req) {
    return req.session;
  }
}
