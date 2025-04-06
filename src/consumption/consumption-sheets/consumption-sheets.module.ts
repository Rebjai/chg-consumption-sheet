import { Module } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { ConsumptionSheetsController } from './consumption-sheets.controller';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsModule } from 'src/rooms/rooms.module';
import { PatientsModule } from 'src/patients/patients.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionSheet]), RoomsModule, PatientsModule],
  controllers: [ConsumptionSheetsController],
  providers: [ConsumptionSheetsService],
  exports: [ConsumptionSheetsService]
})
export class ConsumptionSheetsModule {}
