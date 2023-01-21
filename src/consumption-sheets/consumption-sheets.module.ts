import { Module } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { ConsumptionSheetsController } from './consumption-sheets.controller';

@Module({
  controllers: [ConsumptionSheetsController],
  providers: [ConsumptionSheetsService]
})
export class ConsumptionSheetsModule {}
