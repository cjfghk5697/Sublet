import { IsNumber, IsPositive, IsString } from 'class-validator';

export class PostReportDto {
  @IsNumber()
  @IsPositive()
  post_key: number;

  @IsString()
  reason: string;
}
