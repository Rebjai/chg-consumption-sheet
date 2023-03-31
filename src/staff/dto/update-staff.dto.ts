import { PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
    @IsInt()
    @IsOptional()
    id?: number
}
