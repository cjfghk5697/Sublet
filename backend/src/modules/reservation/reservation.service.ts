import { UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { ReservationInterface } from '@/interface/reservation.interface';

@Injectable()
export class ReservationService {
  constructor(private db: MongodbService) {}

  async createReservation(data: ReservationInterface, user: UserInterface) {
    const res = await this.db.createReservation(data, user);
    if (!res) {
      throw new Error('[reservation.service:reservationRoom] reservation fail');
    }
    return res;
  }
}
