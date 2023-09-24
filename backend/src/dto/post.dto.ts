import { PostBase } from '@/interface/post.interface';
import {
  IsString,
  IsArray,
  IsDateString,
  IsOptional,
  IsInt,
  IsPositive,
} from 'class-validator';

export class PostCreateDto extends PostBase {}

export class PrismaPostCreateDto extends PostBase {
  @IsArray()
  images: string[];
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

  @IsInt()
  @IsPositive()
  @IsOptional()
  min_duration?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max_duration?: number;
}

export class PostGetAllQueryDto {
  @IsOptional()
  maxPost: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number;
}
