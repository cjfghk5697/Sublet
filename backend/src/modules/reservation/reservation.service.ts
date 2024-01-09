import { UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { MongodbService } from '../mongodb/mongodb.service';
import { ReservationInterface } from '@/interface/reservation.interface';

@Injectable()
export class ReservationService {
  constructor(private db: MongodbService) {}

  async createReservation(data: ReservationInterface, user: UserInterface) {
    console.log('[reservation.service:createReservation] starting function');
    console.log('[reservation.service:createReservation] data: ', data);
    console.log('[reservation.service:createReservation] res: ', user);

    const res = await this.db.createReservation(data, user);
    if (!res) {
      console.log('[reservation.service:createReservation] reservation fail');
      throw new Error(
        '[reservation.service:createReservation] reservation fail',
      );
    }
    console.log('[reservation.service:createReservation] returning boolean');
    return res;
  }

  async getAllReservation(user_id: string) {
    console.log('[reservation.service:getAllReservation] starting function');
    console.log('[reservation.service:getAllReservation] data: ', user_id);

    const res = await this.db.getAllReservations(user_id);
    console.log(
      '[reservation.service:getAllReservation] returning boolean',
      res,
    );

    return res;
  }
}
