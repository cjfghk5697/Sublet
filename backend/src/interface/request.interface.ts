import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { UserExportInterface, UserInterface } from './user.interface';
import { Transform } from 'class-transformer';
import { PostExportInterface, PostInterface } from './post.interface';

export class RequestBase {
  @IsString()
  city: string;

  @IsString()
  gu: string;

  @IsString()
  dong: string;

  @IsString()
  accomodation_type: string;

  @IsString()
  building_type: string;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  contract: boolean;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  alarm: boolean;

  @IsString()
  school: string;

  @IsInt()
  @IsPositive()
  @IsNumber()
  number_room: number;

  @IsInt()
  @IsPositive()
  @IsNumber()
  limit_people: number;

  @IsInt()
  @IsPositive()
  @IsNumber()
  price: number;

  @IsDateString()
  end_day: string | Date;

  @IsDateString()
  start_day: string | Date;

  @IsInt()
  @IsPositive()
  @IsNumber()
  number_bathroom: number;

  @IsInt()
  @IsNumber()
  @IsPositive()
  number_bedroom: number;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  complete: boolean;

  @IsString()
  request_text: string;
}

export class RequestExportInterface extends RequestBase {
  key: number;
  User: UserExportInterface;
  Post: PostExportInterface[];
}

export class RequestInterface extends RequestExportInterface {
  id: string;
  delete: boolean;
  User: UserInterface;
  Post: PostInterface[];
}

export class RequestKey {
  key: number;
}

export class RequestId {
  id: string[];
}

export class RequestReview {
  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  gu: string;

  @IsString()
  @IsOptional()
  dong: string;

  @IsString()
  @IsOptional()
  accomodation_type: string;

  @IsString()
  @IsOptional()
  building_type: string;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsOptional()
  contract: boolean;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsOptional()
  alarm: boolean;

  @IsString()
  @IsOptional()
  school: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  number_room: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @IsNumber()
  limit_people: number;

  @IsInt()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  price: number;

  @IsDateString()
  @IsOptional()
  end_day: string | Date;

  @IsDateString()
  @IsOptional()
  start_day: string | Date;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @IsNumber()
  number_bathroom: number;

  @IsInt()
  @IsNumber()
  @IsOptional()
  @IsPositive()
  number_bedroom: number;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
  @IsOptional()
  complete: boolean;

  Post: PostExportInterface[];
}
