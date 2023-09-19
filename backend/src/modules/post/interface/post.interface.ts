import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class PostInterface {
  @IsString()
  id: string;

  @IsNumber()
  key: number;

  @IsArray()
  images: string[];

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

  @IsString()
  min_duration: string;

  @IsString()
  max_duration: string;
}
