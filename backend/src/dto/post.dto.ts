import { PostBase, PostPartialBase } from '@/interface/post.interface';
import {
  IsArray,
  IsOptional,
  IsInt,
  IsPositive,
  IsEmpty,
  IsDateString,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class PostCreateDto extends PostBase {}

export class PrismaPostCreateDto extends PostBase {
  @IsArray()
  image_id: string[];
}

export class PostUpdateDto extends PostPartialBase {
  @IsArray()
  @IsOptional()
  images?: File[];

  @IsEmpty()
  image_id?: string[];
}

export class PostGetAllQueryDto {
  @IsOptional()
  maxPost: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  page: number;
}

export class PostFilterQueryDto extends PostGetAllQueryDto {
  @IsOptional()
  @IsDateString()
  fromDate?: string | Date;

  @IsOptional()
  @IsDateString()
  toDate?: string | Date;

  @IsOptional()
  @IsArray()
  tag?: string[];

  @IsOptional()
  @IsBoolean()
  request?: boolean;

  @IsOptional()
  @IsNumber()
  fromPrice?: number;

  @IsOptional()
  @IsNumber()
  toPrice?: number;

  @IsOptional()
  @IsNumber()
  fromDuration?: number;

  @IsOptional()
  @IsNumber()
  toDuration?: number;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsNumber()
  limit_people?: number;

  @IsOptional()
  @IsNumber()
  number_room?: number;

  @IsOptional()
  @IsNumber()
  number_bathroom?: number;

  @IsOptional()
  @IsNumber()
  number_bedroom?: number;
}
