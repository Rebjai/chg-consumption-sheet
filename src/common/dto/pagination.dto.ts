import { IsOptional, IsInt } from 'class-validator';
export class PaginationDto {
    @IsOptional()
    @IsInt()
    skip?: number = 0;
  
    @IsOptional()
    @IsInt()
    take?: number = 10;
  }
  