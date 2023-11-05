import { PostBase, PostPartialBase } from '@/interface/post.interface';
import {
  IsArray,
  IsOptional,
  IsInt,
  IsPositive,
  IsEmpty,
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
