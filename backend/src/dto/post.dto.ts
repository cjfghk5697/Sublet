import { PostBase, PostPartialBase } from '@/interface/post.interface';
import {
  IsArray,
  IsOptional,
  IsInt,
  IsPositive,
  IsEmpty,
  IsDateString,
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
  @IsInt()
  @IsPositive()
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
}
