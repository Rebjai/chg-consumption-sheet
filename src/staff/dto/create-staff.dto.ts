import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

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
    
    @IsDate()
    @IsNotEmpty()
    date_of_birth: Date
    
    @IsString()
    @IsNotEmpty()
    telephone_number: string

    @IsNumber()
    @IsNotEmpty()
    user_id: number;
}

