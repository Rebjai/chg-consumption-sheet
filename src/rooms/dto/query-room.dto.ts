import { Transform } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { RoomStatus } from '../enums/room-status.enum';
import { RoomType } from '../enums/room-type.enum';

export class QueryRoomDto {
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsEnum(RoomStatus)
    status?: RoomStatus;

    @IsOptional()
    @IsEnum(RoomType)
    type?: RoomType;

    @IsOptional()
    skip?: number;

    @IsOptional()
    take?: number;
}
