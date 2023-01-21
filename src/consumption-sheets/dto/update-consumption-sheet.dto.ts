import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumptionSheetDto } from './create-consumption-sheet.dto';

export class UpdateConsumptionSheetDto extends PartialType(CreateConsumptionSheetDto) {}
