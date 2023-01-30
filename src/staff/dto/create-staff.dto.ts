import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class CreateStaffDto {
    @IsString()
    @IsNotEmpty()
    first_surname: string;

    @IsString()
    @IsNotEmpty()
    second_surname: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    job_title: string;
    
    @IsDateString()
    @IsNotEmpty()
    date_of_birth: Date
    
    @IsString()
    @IsNotEmpty()
    telephone_number: string

    @IsNumber()
    @IsOptional()
    user_id?: number;
}

