import { LoggedInGuard } from '@/guards/logged-in.guard';
import { customRequest } from '@/interface/user.interface';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from '@/dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  // (Qquery) 날짜, 포스트 key, (Req) 유저정보
  @Post()
  @UseGuards(LoggedInGuard)
  async createReservation(
    @Body() data: ReservationDto,
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
}
