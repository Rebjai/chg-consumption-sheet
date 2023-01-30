import { StaffModule } from './../staff/staff.module';
import { ProductsModule } from './../products/products.module';
import { ConsumptionSheetsModule } from './../consumption-sheets/consumption-sheets.module';
import { Module } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionDetail]), ConsumptionSheetsModule, ProductsModule, StaffModule],
  controllers: [ConsumptionDetailsController],
  providers: [ConsumptionDetailsService]
})
export class ConsumptionDetailsModule {}
