import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    first_surname: string;

    @IsString()
    @IsNotEmpty()
    second_surname: string;

    @IsDate()
    date_of_birth: Date
}
