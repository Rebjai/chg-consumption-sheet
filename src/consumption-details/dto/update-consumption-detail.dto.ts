import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateConsumptionDetailDto } from './create-consumption-detail.dto';

export class UpdateConsumptionDetailDto extends PartialType(CreateConsumptionDetailDto) {
    @IsNotEmpty()
    @IsNumber()
    total: number;
}
