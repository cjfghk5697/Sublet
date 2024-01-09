import { ReservationInterface } from '@/interface/reservation.interface';
import { IsDateString, IsOptional, IsString } from 'class-validator';

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

export class ReservationFilterDto {
  @IsOptional()
  @IsDateString()
  r_start_day?: string | Date;

  @IsOptional()
  @IsDateString()
  r_end_day?: string | Date;

  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  post_key?: string;
}
