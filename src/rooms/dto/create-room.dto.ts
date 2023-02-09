import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from "class-transformer"
import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MinLength } from "class-validator"

export class CreateRoomDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    status: number

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    type: number
}
