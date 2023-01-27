import { IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
    @IsBoolean()
    active: Boolean
}
