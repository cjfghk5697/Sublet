import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostBase {
  @IsString()
  basic_info: string;

  @IsString()
  benefit: string;

  @IsString()
  description: string;

  @IsDateString()
  end_day: string | Date;

  @IsString()
  extra_info: string;

  @IsInt()
  @IsNumber()
  max_duration: number;

  @IsInt()
  @IsNumber()
  min_duration: number;

  @IsString()
  position: string;

  @IsString()
  refund_policy: string;

  @IsString()
  rule: string;

  @IsDateString()
  start_day: string | Date;

  @IsString()
  title: string;
}

export class PostPartialBase {
  @IsString()
  @IsOptional()
  basic_info?: string;

  @IsString()
  @IsOptional()
  benefit?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  end_day?: string | Date;

  @IsString()
  @IsOptional()
  extra_info?: string;

  @IsInt()
  @IsNumber()
  @IsOptional()
  max_duration?: number;

  @IsInt()
  @IsNumber()
  @IsOptional()
  min_duration?: number;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  refund_policy?: string;

  @IsString()
  @IsOptional()
  rule?: string;

  @IsDateString()
  @IsOptional()
  start_day?: string | Date;

  @IsString()
  @IsOptional()
  title?: string;
}

export class PostInterface extends PostBase {
  @IsString()
  id: string;

  @IsNumber()
  key: number;

  @IsArray()
  image_id: string[];

  @IsString()
  postuser_id: string;

  @IsBoolean()
  deleted: boolean;

  @IsDate()
  post_date: Date | string;
}
