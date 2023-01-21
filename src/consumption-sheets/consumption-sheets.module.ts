import { Module } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { ConsumptionSheetsController } from './consumption-sheets.controller';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionSheet])],
  controllers: [ConsumptionSheetsController],
  providers: [ConsumptionSheetsService]
})
export class ConsumptionSheetsModule {}
