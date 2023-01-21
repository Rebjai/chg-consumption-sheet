import { IsInt } from 'class-validator';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsString()
    @IsNotEmpty()
    status: string

    @IsInt()
    @IsNotEmpty()
    type: number
}
