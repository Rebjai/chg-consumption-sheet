import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '../printer/printer.module';
import { Patient } from '../patients/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionSheetsModule } from 'src/consumption/consumption-sheets/consumption-sheets.module';
import { ConsumptionDetail } from 'src/consumption/consumption-details/entities/consumption-detail.entity';
import { ConsumptionSheet } from 'src/consumption/consumption-sheets/entities/consumption-sheet.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    ConsumptionSheetsModule,
    PrinterModule,
    TypeOrmModule.forFeature([Patient, ConsumptionDetail, ConsumptionSheet]),
  ],
})

// Remember install: npm install @types/pdfmake
export class ReportsModule {}
