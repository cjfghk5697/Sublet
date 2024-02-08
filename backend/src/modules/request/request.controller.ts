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
      return res;
    } catch (e) {
      console.log('[reservation.controller:getRequestByUserKey] error: ', e);
      throw new BadRequestException();
    }
  }

  @Delete()
  @UseGuards(LoggedInGuard)
  async deleteOneRequest(@Body() data: requestKey, @Req() req: customRequest) {
    if (!req.user) {
      console.log(
        "[reservation.controller:deleteOneRequest] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }
    try {
      const res = await this.reservationService.deleteOneRequest(data.key);
      return { ok: res };
    } catch (e) {
      console.log('[reservation.controller:deleteOneRequest] error: ', e);
      throw new BadRequestException();
    }
  }
}
