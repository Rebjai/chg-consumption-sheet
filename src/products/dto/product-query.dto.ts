import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator"

export class ProductQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string = ''
    
    @ApiProperty()
    @Type(()=> Number)
    @IsNumber()
    @IsOptional()
    @Min(0)
    price: number = 0
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    price_filter?: 'lt' | 'gt' = 'gt'

}
