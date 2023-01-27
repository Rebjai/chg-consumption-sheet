import { Transform, TransformFnParams } from "class-transformer"
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MinLength } from "class-validator"

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string

    @IsNumber()
    @IsNotEmpty()
    status: number

    @IsInt()
    @IsNotEmpty()
    type: number
}
