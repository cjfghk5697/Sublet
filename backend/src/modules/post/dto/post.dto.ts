import { IsString, IsArray, IsDateString, IsOptional } from 'class-validator';

export class PostCreateDto {
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

export class PostUpdateDto {
  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  basic_info?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  rule?: string;

  @IsString()
  @IsOptional()
  refund_policy?: string;

  @IsString()
  @IsOptional()
  benefit?: string;

  @IsString()
  @IsOptional()
  extra_info?: string;

  @IsDateString()
  @IsOptional()
  start_day?: string;

  @IsDateString()
  @IsOptional()
  end_day?: string;

  @IsString()
  @IsOptional()
  min_duration?: string;

  @IsString()
  @IsOptional()
  max_duration?: string;
}
