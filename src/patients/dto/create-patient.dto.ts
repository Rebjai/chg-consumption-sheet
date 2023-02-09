import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_surname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    second_surname: string;
    
    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date

}
