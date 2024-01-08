import { ReservationInterface } from '@/interface/reservation.interface';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { PostFilterQueryDto } from './post.dto';

export class ReservationDto extends ReservationInterface {
  @IsDateString()
  r_start_day: string | Date;

  @IsDateString()
  r_end_day: string | Date;

  @IsString()
  user_id: string;

  @IsString()
  post_key: string;
}
