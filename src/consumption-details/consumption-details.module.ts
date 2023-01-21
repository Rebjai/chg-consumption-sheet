import { Module } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ConsumptionDetailsController } from './consumption-details.controller';

@Module({
  controllers: [ConsumptionDetailsController],
  providers: [ConsumptionDetailsService]
})
export class ConsumptionDetailsModule {}
