import { ConsumptionSheetsModule } from './../consumption-sheets/consumption-sheets.module';
import { Module } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from 'src/areas/areas.module';
import { ProductsModule } from 'src/inventory/products/products.module';
import { StaffModule } from 'src/staff/staff.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionDetail]), ConsumptionSheetsModule, ProductsModule, StaffModule, UsersModule, AreasModule],
  controllers: [ConsumptionDetailsController],
  providers: [ConsumptionDetailsService],
})
export class ConsumptionDetailsModule {}
