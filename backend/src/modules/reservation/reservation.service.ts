import { UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { ReservationInterface } from '@/interface/reservation.interface';

@Injectable()
export class ReservationService {
  constructor(private db: MongodbService) {}

  async createReservation(data: ReservationInterface, user: UserInterface) {
    console.log('[reservation.service:reservationRoom] starting function');
    console.log('[reservation.service:reservationRoom] data: ', data);

    const res = await this.db.createReservation(data, user);
    console.log('[reservation.service:reservationRoom] res: ', user);
    if (!res) {
      console.log('[reservation.service:reservationRoom] reservation fail');
      throw new Error('[reservation.service:reservationRoom] reservation fail');
    }
    console.log('[reservation.service:reservationRoom] returning boolean');
    return res;
  }
}
