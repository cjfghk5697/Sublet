import { UserExportInterface, UserInterface } from '@/interface/user.interface';
import { Injectable } from '@nestjs/common';
import { ReservationCreateDto } from '@/dto/reservation.dto';
import { MongodbReservationService } from '../mongodb/mongodb.reservation.service';
import {
  ReservationExportInterface,
  ReservationInterface,
} from '@/interface/reservation.interface';
import { UserService } from '../user/user.service';
import { PostExportInterface } from '@/interface/post.interface';
import { PostService } from '../post/post.service';

@Injectable()
export class ReservationService {
  constructor(private db: MongodbReservationService) {}

  async createReservation(data: ReservationCreateDto, user: UserInterface) {
    const res = await this.db.createReservation(data, user);
    if (!res) {
      throw new Error(
        '[reservation.service:createReservation] reservation fail',
      );
    }
    return res;
  }

  async getAllReservation(user_id: string) {
    const res = await this.db.getAllReservations(user_id);
    const ret = res.map((ele) => this.transformExport(ele));
    return ret;
  }

  async deleteOneReservation(key: number, user: UserInterface) {
    const res = await this.db.deleteOneReservation(key, user);
    return res;
  }

  async getReservationsbyPost(key: number) {
    const res = await this.db.getReservationsbyPost(key);
    const ret = res.map((ele) => this.transformExport(ele));
    return ret;
  }

  async putReservationByKey(key: number, reservation_state: string) {
    const res = await this.db.putReservationByKey(key, reservation_state);

    return res;
  }

  transformExport(
    reservation: ReservationInterface,
  ): ReservationExportInterface {
    delete (reservation as { id?: string }).id;
    delete (reservation as { post_id?: string }).post_id;
    (reservation as { user: UserExportInterface }).user =
      UserService.transformExport(reservation.user);
    (reservation as { post: PostExportInterface }).post =
      PostService.transformExport(reservation.post);
    return reservation;
  }
}
