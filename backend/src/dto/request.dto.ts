import { RequestBase } from '@/interface/request.interface';
import { IsInt, IsNumber } from 'class-validator';
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
