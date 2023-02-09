import { PartialType } from '@nestjs/swagger';
import { CreateConsumptionDetailDto } from './create-consumption-detail.dto';

export class UpdateConsumptionDetailDto extends PartialType(CreateConsumptionDetailDto) {}
