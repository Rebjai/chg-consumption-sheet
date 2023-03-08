import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateConsumptionSheetDto {
    @ApiProperty()
    @IsNotEmpty()
    patient_id: number;

    @ApiProperty()
    @IsNotEmpty()
    room_id: number;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(type => Date)
    admission_date: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    diagnosis: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    doctor: string
}
