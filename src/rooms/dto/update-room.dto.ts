import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsInt()
    @IsNotEmpty()
    status: number

    @IsInt()
    @IsNotEmpty()
    type: number
}
