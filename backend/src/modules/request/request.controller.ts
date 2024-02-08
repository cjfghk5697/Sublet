import { LoggedInGuard } from '@/guards/logged-in.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestCreateDto, requestKey } from '@/dto/request.dto';
import { customRequest } from '@/interface/user.interface';

@Controller('request')
export class RequestController {
  constructor(private readonly reservationService: RequestService) {}
  // (Qquery) 날짜, 포스트 key, (Req) 유저정보
  @Post()
  @UseGuards(LoggedInGuard)
  async createRequest(
    @Body() data: RequestCreateDto,
    @Req() req: customRequest,
  ) {
    if (!req.user) {
      console.log(
        "[reservation.controller:createRequest] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }

    try {
      const res = await this.reservationService.createRequest(data, req.user);
      console.log('[reservation.controller:createRequest] res: ', res);
      return res;
    } catch (e) {
      console.log('[reservation.controller:createRequest] error: ', e);
      throw new BadRequestException();
    }
  }
  @Get()
  @UseGuards(LoggedInGuard)
  async getRequestByUserKey(@Req() req: customRequest) {
    if (!req.user) {
      console.log(
        "[reservation.controller:getRequestByUserKey] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }

    try {
      const res = await this.reservationService.getRequestByUserKey(
        req.user.user_id,
      );
      console.log('[reservation.controller:getRequestByUserKey] res: ', res);
      return res;
    } catch (e) {
      console.log('[reservation.controller:getRequestByUserKey] error: ', e);
      throw new BadRequestException();
    }
  }

  @Delete()
  @UseGuards(LoggedInGuard)
  async deleteOneRequest(@Body() data: requestKey, @Req() req: customRequest) {
    console.log('[reservation.controller:deleteOneRequest] starting function');
    console.log('[reservation.controller:deleteOneRequest] key: ', data.key);
    console.log(
      '[reservation.controller:deleteOneRequest] req.user: ',
      req.user,
    );
    if (!req.user) {
      console.log(
        "[reservation.controller:deleteOneRequest] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }
    try {
      const res = await this.reservationService.deleteOneRequest(data.key);
      console.log('[reservation.controller:deleteOneRequest] res: ', res);
      return { ok: res };
    } catch (e) {
      console.log('[reservation.controller:deleteOneRequest] error: ', e);
      throw new BadRequestException();
    }
  }
}
