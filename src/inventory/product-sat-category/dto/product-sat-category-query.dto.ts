import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class ProductSatCategoryQueryDto {

    @IsOptional()
    @IsNumber()
    code: number
    
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    q: string
}
