import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateConsumptionSheetDto } from './create-consumption-sheet.dto';

export class UpdateConsumptionSheetDto extends PartialType(OmitType(CreateConsumptionSheetDto, ['patient_id'] as const)) {
}
