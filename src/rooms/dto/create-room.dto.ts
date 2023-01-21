import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    status: string

    @IsInt()
    @IsNotEmpty()
    type: number
}
