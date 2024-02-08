import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserExportInterface } from './user.interface';
import { Transform } from 'class-transformer';

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
  @IsBoolean()
  contract: boolean;

  @Transform(({ key, obj }) => {
    const value = obj[key].toLowerCase();
    if (value === 'true') return true;
    else if (value === 'false') return false;
    else return undefined;
  })
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
  key: number;
}
export class RequestDeleteInterface extends RequestExportInterface {
  delete: boolean;
}

export class RequestInterface extends RequestBase {
  id: string;
  User: UserExportInterface;
}
