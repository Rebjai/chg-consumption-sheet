import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateConsumptionSheetDto {
    @IsNotEmpty()
    patient_id: number;

    @IsNotEmpty()
    room_id: number;

    @IsDateString()
    @IsNotEmpty()
    admission_date: Date;

    @IsString()
    @IsNotEmpty()
    diagnosis: string

    @IsString()
    @IsNotEmpty()
    doctor: string
}
