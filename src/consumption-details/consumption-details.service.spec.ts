import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionDetailsService } from './consumption-details.service';

describe('ConsumptionDetailsService', () => {
  let service: ConsumptionDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumptionDetailsService],
    }).compile();

    service = module.get<ConsumptionDetailsService>(ConsumptionDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
