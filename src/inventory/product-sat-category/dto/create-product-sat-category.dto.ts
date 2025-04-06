import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateProductSatCategoryDto {

    @IsNotEmpty()
    @IsNumber()
    code: string
    
    @IsNotEmpty()
    @IsString()
    name: string
}
