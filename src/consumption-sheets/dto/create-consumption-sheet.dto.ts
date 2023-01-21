import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class CreateConsumptionSheetDto {
    @IsNotEmpty()
    patient_id: number;

    @IsNotEmpty()
    room_id: number;

    @IsDate()
    @IsNotEmpty()
    admission_date: Date;

    @IsDate()
    discharge_date: Date;

    @IsString()
    @IsNotEmpty()
    diagnosis: string
}
