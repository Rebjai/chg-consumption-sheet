import { RoomType } from '../rooms/enums/room-type.enum';
import { RoomStatus } from '../rooms/enums/room-status.enum';
import { Patient } from './../patients/entities/patient.entity';
import { Room } from './../rooms/entities/room.entity';
import { RoomsService } from './../rooms/rooms.service';
import { PatientsService } from './../patients/patients.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ConsumptionSheetsService', () => {
  let service: ConsumptionSheetsService;
  const now = new Date()
  const newConsumptionSheet: CreateConsumptionSheetDto = {
    patient_id: 1,
    room_id: 1,
    doctor: 'Cesar',
    diagnosis: 'Cesárea',
    admission_date: new Date(),
  }
  const rooms: Room[] = [{
    id: 1, name: '420',
    status: RoomStatus.AVAILABLE,
    type: RoomType.CLASSIC,
    createdAt: now,
    updatedAt: now,
  }]
  const patiens: Patient[] = [{
    id: 1,
    name: 'Martha',
    firstSurname: 'Appat',
    secondSurname: 'Apmat',
    dateOfBirth: new Date(1990, 1, 1),
    createdAt: now,
    updatedAt: now,
    active:true
  }]
  const patientsServiceMock = {
    findOne: jest.fn().mockImplementation((id: number): Promise<Patient> => Promise.resolve(patiens.find((val) => val.id == id)))
  }
  const roomsServiceMock = {
    findOne: jest.fn().mockImplementation((id: number): Promise<Room> => Promise.resolve(rooms.find((val) => val.id == id))),
  }
  const consumptionSheetRepositoryMock = {
    save: jest.fn((consumptionSheet: ConsumptionSheet) => consumptionSheet)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumptionSheetsService,
        {
          provide: getRepositoryToken(ConsumptionSheet),
          useValue: consumptionSheetRepositoryMock
        },
        {
          provide: RoomsService,
          useValue: roomsServiceMock
        },
        {
          provide: PatientsService,
          useValue: patientsServiceMock
        },
      ],
    }).compile();

    service = module.get<ConsumptionSheetsService>(ConsumptionSheetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a new entity', async () => {
    const created = await service.create(newConsumptionSheet)
    expect(created).toBeInstanceOf(ConsumptionSheet)
    expect(roomsServiceMock.findOne).toHaveBeenCalled()
    expect(patientsServiceMock.findOne).toHaveBeenCalled()
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalled()
  });
});
