import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionSheetsController } from './consumption-sheets.controller';
import { ConsumptionSheetsService } from './consumption-sheets.service';

describe('ConsumptionSheetsController', () => {
  let controller: ConsumptionSheetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionSheetsController],
      providers: [ConsumptionSheetsService],
    }).compile();

    controller = module.get<ConsumptionSheetsController>(ConsumptionSheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
