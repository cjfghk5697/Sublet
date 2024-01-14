import { Transform } from 'class-transformer';
import { PostExportInterface } from './post.interface';
import { UserExportInterface } from './user.interface';
import { IsDateString, IsInt, IsNumber, IsString } from 'class-validator';

export class ReservationBase {
  @IsDateString()
  r_start_day: Date | string;

  @IsDateString()
  r_end_day: Date | string;

  @IsString()
  user_id: string;

  @IsString()
  post_key: string;
}
export class ReservationExportInterface extends ReservationBase {
  @IsInt()
  @IsNumber()
  key: number;
}

export class ReservationInterface extends ReservationExportInterface {
  id: string;
  User: UserExportInterface;
  Post: PostExportInterface;
}
