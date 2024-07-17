import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { PrinterModule } from '../printer/printer.module';
import { ConsumptionDetail } from '../consumption-details/entities/consumption-detail.entity';
import { Patient } from '../patients/entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    PrinterModule,
    TypeOrmModule.forFeature([Patient, ConsumptionDetail]),
  ],
})

// Recuerda instalar esto: npm install @types/pdfmake porque esta version de Node vale pa pura v
export class ReportsModule {}
