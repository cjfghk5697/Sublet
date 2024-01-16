import { LoggedInGuard } from '@/guards/logged-in.guard';
import { customRequest } from '@/interface/user.interface';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  ReservationCreateDto,
  reservationRequest,
} from '@/dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  // (Qquery) 날짜, 포스트 key, (Req) 유저정보
  @Post()
  @UseGuards(LoggedInGuard)
  async createReservation(
    @Body() data: ReservationCreateDto,
    @Req() req: customRequest,
  ) {
    if (!req.user) {
      console.log(
        "[reservation.controller:createReservation] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }

    try {
      const res = await this.reservationService.createReservation(
        data,
        req.user,
      );
      console.log('[reservation.controller:createReservation] res: ', res);
      return res;
    } catch (e) {
      console.log('[reservation.controller:createReservation] error: ', e);
      throw new BadRequestException();
    }
  }

  @Get()
  @UseGuards(LoggedInGuard)
  async getAllReservation(@Req() req: customRequest) {
    if (!req.user) {
      console.log(
        "[reservation.controller:getAllReservation] req.user doesn't exist",
      );
      throw new UnauthorizedException();
    }

    try {
      const res = await this.reservationService.getAllReservation(
        req.user.user_id,
      );
      console.log('[reservation.controller:getAllReservation] res: ', res);
      return res;
    } catch (e) {
      console.log('[reservation.controller:getAllReservation] error: ', e);
      throw new BadRequestException();
    }
  }

  @Delete()
  @UseGuards(LoggedInGuard)
  async deleteOneReservation(
    @Body() data: reservationRequest,
    @Req() req: customRequest,
  ) {
    console.log('[post.controller:DeleteOnePost] starting function');
    console.log('[post.controller:DeleteOnePost] key: ', data.key);
    console.log('[post.controller:DeleteOnePost] req.user: ', req.user);
    if (!req.user) {
      console.log("[post.controller:DeleteOnePost] req.user doesn't exist");
      throw new UnauthorizedException();
    }
    try {
      const res = await this.reservationService.deleteOneReservation(
        data.key,
        req.user,
      );
      console.log('[reservation.controller:DeleteOneResrvation] res: ', res);
      return { ok: res };
    } catch (e) {
      console.log('[reservation.controller:DeleteOneResrvation] error: ', e);
      throw new BadRequestException();
    }
  }
}
