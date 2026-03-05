import { IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  reportType: string;
}