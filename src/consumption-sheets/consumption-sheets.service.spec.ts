import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionSheetsService } from './consumption-sheets.service';

describe('ConsumptionSheetsService', () => {
  let service: ConsumptionSheetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionSheetsService],
    }).compile();

    service = module.get<ConsumptionSheetsService>(ConsumptionSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
