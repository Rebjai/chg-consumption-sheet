import { UsersModule } from './../users/users.module';
import { StaffModule } from './../staff/staff.module';
import { ProductsModule } from './../products/products.module';
import { ConsumptionSheetsModule } from './../consumption-sheets/consumption-sheets.module';
import { Module } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionDetail]), ConsumptionSheetsModule, ProductsModule, StaffModule, UsersModule, AreasModule],
  controllers: [ConsumptionDetailsController],
  providers: [ConsumptionDetailsService],
})
export class ConsumptionDetailsModule {}
