import { Controller, Post, Res, Req, UseGuards, Next } from '@nestjs/common';
import { LocalGuard } from '../../guards/local.guard';
import { LoggedInGuard } from '../../guards/logged-in.guard';
import { Request, Response } from 'express';

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
    @Req() req: Request,
    @Res() res: Response,
    /* eslint-disable-next-line @typescript-eslint/ban-types */
    @Next() next: Function,
  ) {
    req.logOut(function (err) {
      //middleware에 function은 err. req,res,next가 들어갈수 있다.
      if (err) {
        return next(err);
      }
      res.send({ ok: true });
    });
  }
}
