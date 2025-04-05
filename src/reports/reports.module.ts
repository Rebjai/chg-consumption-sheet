import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '../printer/printer.module';
import { ConsumptionDetail } from '../consumption-details/entities/consumption-detail.entity';
import { Patient } from '../patients/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionSheet } from '../consumption-sheets/entities/consumption-sheet.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    PrinterModule,
    TypeOrmModule.forFeature([Patient, ConsumptionDetail, ConsumptionSheet]),
  ],
})

// Remember install: npm install @types/pdfmake
export class ReportsModule {}
