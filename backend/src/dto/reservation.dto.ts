import { ReservationBase } from '@/interface/reservation.interface';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class ReservationCreateDto extends ReservationBase {}

export class ReservationDto extends ReservationBase {
  @IsNumber()
  @IsInt()
  key: number;
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

  @IsOptional()
  @IsNumber()
  @IsInt()
  key?: number;
}
