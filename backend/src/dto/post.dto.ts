import { PostBase, PostPartialBase } from '@/interface/post.interface';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsInt,
  IsPositive,
  IsEmpty,
  IsDateString,
  IsString,
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

  @IsOptional()
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
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
  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  contract?: boolean;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  x_coordinate?: number;

  @IsOptional()
  @IsPositive()
  @IsNumber()
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
