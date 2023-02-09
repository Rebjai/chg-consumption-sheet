import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsEnum } from 'class-validator';
import { RoomStatus } from '../enums/room-status.enum';
import { RoomType } from '../enums/room-type.enum';

export class QueryRoomDto {
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsEnum(RoomStatus)
    status?: RoomStatus;
    
    @ApiProperty()
    @IsOptional()
    @IsEnum(RoomType)
    type?: RoomType;
}
