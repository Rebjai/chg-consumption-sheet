import { StaffService } from './../staff/staff.service';
import { ProductsService } from './../products/products.service';
import { ConsumptionSheetsService } from './../consumption-sheets/consumption-sheets.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionDetailsService } from './consumption-details.service';

describe('ConsumptionDetailsService', () => {
  let service: ConsumptionDetailsService;
  const consumptionDetailRepositoryMock = {}
  const consumptionSheetServiceMock = {}
  const productsServiceMock = {}
  const staffServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumptionDetailsService,
        {provide: ConsumptionDetailsService, useValue: consumptionDetailRepositoryMock},
        {provide: ConsumptionSheetsService, useValue: consumptionSheetServiceMock},
        {provide: ProductsService, useValue: productsServiceMock},
        {provide: StaffService, useValue: staffServiceMock},
      ],
    }).compile();

    service = module.get<ConsumptionDetailsService>(ConsumptionDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
