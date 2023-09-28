import { Controller, Post, Res, Req, UseGuards, Next } from '@nestjs/common';
import { LocalGuard } from '../../guards/local.guard';
import { LoggedInGuard } from '../../guards/logged-in.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login() {
    return { ok: true };
  }

  @UseGuards(LocalGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res, @Next() next) {
    req.logOut(function (err) {
      //middleware에 function은 err. req,res,next가 들어갈수 있다.
      if (err) {
        return next(err);
      }
    });
    console.log('logout');
  }
}
