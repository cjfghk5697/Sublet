import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserExportInterface } from './user.interface';

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

  @IsBoolean()
  contract: boolean;

  @IsBoolean()
  alarm: boolean;

  @IsString()
  school: string;

  @IsInt()
  @IsNumber()
  number_room: number;

  @IsInt()
  @IsNumber()
  limit_people: number;

  @IsInt()
  @IsNumber()
  price: number;

  @IsDateString()
  end_day: string | Date;

  @IsDateString()
  start_day: string | Date;

  @IsInt()
  @IsNumber()
  number_bathroom: number;

  @IsInt()
  @IsNumber()
  number_bedroom: number;
}

export class RequestExportInterface extends RequestBase {
  @IsInt()
  @IsNumber()
  key: number;
}

export class RequestInterface extends RequestBase {
  id: string;
  User: UserExportInterface;
}
