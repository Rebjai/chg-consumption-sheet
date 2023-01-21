import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetailsService } from './consumption-details.service';

describe('ConsumptionDetailsController', () => {
  let controller: ConsumptionDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionDetailsController],
      providers: [ConsumptionDetailsService],
    }).compile();

    controller = module.get<ConsumptionDetailsController>(ConsumptionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
