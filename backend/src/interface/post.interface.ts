import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserBase } from './user.interface';

export class PostBase {
  @IsString()
  title: string;

  @IsString()
  basic_info: string;

  @IsString()
  description: string;

  @IsString()
  position: string;

  @IsString()
  rule: string;

  @IsString()
  refund_policy: string;

  @IsString()
  benefit: string;

  @IsString()
  extra_info: string;

  @IsDateString()
  start_day: string | Date;

  @IsDateString()
  end_day: string | Date;

  @IsInt()
  @IsNumber()
  min_duration: number;

  @IsInt()
  @IsNumber()
  max_duration: number;

  @IsEmpty()
  postuser: UserBase;
}

export class PostInterface extends PostBase {
  @IsString()
  id: string;

  @IsNumber()
  key: number;

  @IsArray()
  images: string[];
}
