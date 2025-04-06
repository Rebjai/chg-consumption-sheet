import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    category_id : number
}
