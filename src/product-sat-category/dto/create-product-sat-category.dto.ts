import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductSatCategoryDto {

    @IsNotEmpty()
    @IsNumber()
    code: number
    
    @IsNotEmpty()
    @IsString()
    name: string
}
