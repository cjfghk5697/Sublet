import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../../guards/local.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login() {
    return { ok: true };
  }
}
