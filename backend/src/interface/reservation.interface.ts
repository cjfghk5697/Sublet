import { PostExportInterface } from './post.interface';

export class ReservationInterface {
  id: string;
  r_start_day: Date | string;
  r_end_day: Date | string;
  user_id: string;
  post_key: string;
}
export class FilterReservationInterface {
  Post: PostExportInterface;
}
