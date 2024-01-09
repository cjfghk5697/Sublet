import { PostExportInterface } from './post.interface';
import { UserExportInterface } from './user.interface';

export class ReservationInterface {
  id: string;
  r_start_day: Date | string;
  r_end_day: Date | string;
  user_id: string;
  post_key: string;
}
export class ReservationExportInterface extends ReservationInterface {
  User: UserExportInterface;
  Post: PostExportInterface;
}
