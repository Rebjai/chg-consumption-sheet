import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionSheetsController } from './consumption-sheets.controller';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { PatientsService } from 'src/patients/patients.service';

describe('ConsumptionSheetsController', () => {
  let controller: ConsumptionSheetsController;
  const consumptionSheetRepositoryMock = {}
  const roomsServiceMock = {}
  const patientsServiceMock = {}


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionSheetsController],
      providers: [ConsumptionSheetsService,
      {provide: getRepositoryToken(ConsumptionSheet), useValue: consumptionSheetRepositoryMock},
      {provide: RoomsService, useValue: roomsServiceMock},
      {provide: PatientsService, useValue: patientsServiceMock},
    ],
    }).compile();

    controller = module.get<ConsumptionSheetsController>(ConsumptionSheetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
