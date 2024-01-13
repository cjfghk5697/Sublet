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
  IsDecimal,
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

  @IsOptional()
  @IsString()
  accomodation_type?: string; //건물 유형

  @IsOptional()
  @IsString()
  building_type?: string; //아파트인지, 주택인지

  @IsOptional()
  @IsBoolean()
  contract?: boolean;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  x_coordinate?: number;

  @IsOptional()
  @IsPositive()
  @IsString()
  y_coordinate?: number;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  gu?: string;

  @IsOptional()
  @IsString()
  dong?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  street_number?: string;

  @IsOptional()
  @IsString()
  post_code?: string;
}
