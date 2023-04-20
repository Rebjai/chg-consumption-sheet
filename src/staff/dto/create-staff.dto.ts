import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateStaffDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    first_surname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    second_surname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    job_title?: string;
    
    @IsDateString()
    @IsNotEmpty()
    date_of_birth: Date
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    telephone_number: string

    @IsNumber()
    @IsOptional()
    user_id?: number;
}

