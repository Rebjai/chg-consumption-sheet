import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class ProductQueryDto {
    @IsOptional()
    @IsString()
    name: string = ''

    @Type(()=> Number)
    @IsNumber()
    @IsOptional()
    @Min(0)
    price: number = 0
    
    @IsOptional()
    @IsString()
    price_filter?: 'lt' | 'gt' = 'gt'

}
