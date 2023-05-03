import { IsBoolean, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './create-patient.dto';
import { Type } from 'class-transformer';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    @IsNotEmpty()
    @IsBoolean()
    @Type(() => Boolean)
    active: boolean
}
