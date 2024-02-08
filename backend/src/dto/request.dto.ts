import { RequestInterface, RequestBase } from '@/interface/request.interface';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class RequestCreateDto extends RequestBase {}

export class RequestDto extends RequestBase {
  @IsNumber()
  @IsInt()
  key: number;
}

export class requestKey {
  @IsNumber()
  @IsInt()
  key: number;
}
