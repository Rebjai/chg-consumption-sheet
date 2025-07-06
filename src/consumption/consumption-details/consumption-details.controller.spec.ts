import { ConsumptionSheetsService } from './../consumption-sheets/consumption-sheets.service';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConsumptionDetailsController } from './consumption-details.controller';
import { ConsumptionDetailsService } from './consumption-details.service';
import { ProductsService } from 'src/inventory/products/products.service';
import { StaffService } from 'src/staff/staff.service';
import { UsersService } from 'src/users/users.service';
import { QueryBus } from '@nestjs/cqrs';

describe('ConsumptionDetailsController', () => {
  let controller: ConsumptionDetailsController;
  const consumptionDetailRepositoryMock = {}
  const consumptionSheetsServiceMock = {}
  const productsServiceMock = {}
  const staffServiceMock = {}
  const usersServiceMock = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionDetailsController],
      providers: [ConsumptionDetailsService,
      {provide: getRepositoryToken(ConsumptionDetail), useValue: consumptionDetailRepositoryMock},
      {provide: ConsumptionSheetsService, useValue: consumptionSheetsServiceMock},
      {provide: ProductsService, useValue: productsServiceMock},
      {provide: StaffService, useValue: staffServiceMock},
      {provide: UsersService, useValue: usersServiceMock},
      {provide: QueryBus, useValue: {}},

    ],
    }).compile();

    controller = module.get<ConsumptionDetailsController>(ConsumptionDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
