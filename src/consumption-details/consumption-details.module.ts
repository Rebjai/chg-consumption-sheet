import { Module } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumptionDetail])],
  controllers: [ConsumptionDetailsController],
  providers: [ConsumptionDetailsService]
})
export class ConsumptionDetailsModule {}
