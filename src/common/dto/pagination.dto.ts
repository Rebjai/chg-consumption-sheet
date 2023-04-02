import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginationDto implements IPaginationOptions{
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type( type => Number)
    page: number = 1;
    
    
    @IsOptional()
    @IsInt()
    @Type( type => Number)
    limit: number = 10;

    route? : string
  }
  