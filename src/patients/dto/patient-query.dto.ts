import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PatientQueryDto {
    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    with_cosumption?: boolean

}
