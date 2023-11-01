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

  @UseGuards(LoggedInGuard)
  @Post('logout')
  async logout(
    @Req() req: Express.Request,
    @Res() _res: Express.Response,
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    @Next() next: Function,
  ) {
    req.logOut(function (err) {
      //middleware에 function은 err. req,res,next가 들어갈수 있다.
      if (err) {
        return next(err);
      }
    });
    console.log('logout');
  }
}
