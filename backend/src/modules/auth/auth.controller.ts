import {
  Controller,
  Post,
  Res,
  Req,
  UseGuards,
  Next,
  Body,
} from '@nestjs/common';
import { LocalGuard } from '../../guards/local.guard';
import { LoggedInGuard } from '../../guards/logged-in.guard';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserLoginDto } from '@/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('[LOGIN]', data);
    const access_token = this.authService.login(data);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 10000,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return access_token;
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
    console.log('logout');
  }
}
