import { StaffService } from './../staff/staff.service';
import { ProductsService } from './../products/products.service';
import { ConsumptionSheetsService } from './../consumption-sheets/consumption-sheets.service';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetailsService } from './consumption-details.service';

describe('ConsumptionDetailsController', () => {
  let controller: ConsumptionDetailsController;
  const consumptionDetailRepositoryMock = {}
  const consumptionSheetsServiceMock = {}
  const productsServiceMock = {}
  const staffServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionDetailsController],
      providers: [ConsumptionDetailsService,
      {provide: getRepositoryToken(ConsumptionDetail), useValue: consumptionDetailRepositoryMock},
      {provide: ConsumptionSheetsService, useValue: consumptionSheetsServiceMock},
      {provide: ProductsService, useValue: productsServiceMock},
      {provide: StaffService, useValue: staffServiceMock},
    ],
    }).compile();

    controller = module.get<ConsumptionDetailsController>(ConsumptionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
