import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsOptional, IsEnum, IsInt } from 'class-validator';
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

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Type(type => Number)
    include?: number;
}
