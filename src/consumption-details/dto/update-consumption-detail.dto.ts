import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionDetailDto } from './create-consumption-detail.dto';

export class UpdateConsumptionDetailDto extends PartialType(CreateConsumptionDetailDto) {}
