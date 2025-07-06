import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';
import { UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from 'src/rooms/entities/room.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { RoomStatus } from 'src/rooms/enums/room-status.enum';
import { RoomType } from 'src/rooms/enums/room-type.enum';
import { Area } from 'src/areas/domain/entities/area.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { PatientsService } from 'src/patients/patients.service';

describe('ConsumptionSheetsService', () => {
  let service: ConsumptionSheetsService;
  const now = new Date()
  const rooms: Room[] = [{
    id: 1, name: '420',
    status: RoomStatus.AVAILABLE,
    type: RoomType.CLASSIC,
    area: new Area(),
    created_at: now,
    updated_at: now,
  }]
  const patients: Patient[] = [{
    id: 1,
    name: 'Martha',
    first_surname: 'Appat',
    second_surname: 'Apmat',
    date_of_birth: new Date(1990, 1, 1),
    created_at: now,
    updated_at: now,
    active: true
  }]
  const consumptionSheets: ConsumptionSheet[] = [
    {
      id: 1,
      patient_id: 1,
      room_id: 1,
      doctor: 'Cesar',
      diagnosis: 'Cesárea',
      admission_date: new Date(),
      patient: patients[0],
      room: rooms[0],
      created_at: new Date(),
      discharge_date: new Date(),
      updated_at: new Date()
    }
  ]
  const patientsServiceMock = {
    findOne: jest.fn().mockImplementation((id: number): Promise<Patient> => Promise.resolve(patients.find((val) => val.id == id)))
  }
  const roomsServiceMock = {
    findOne: jest.fn().mockImplementation((id: number): Promise<Room> => Promise.resolve(rooms.find((val) => val.id == id))),
    updateRoomStatus: jest.fn().mockImplementation((id: number, status: RoomStatus): Promise<Room> => Promise.resolve(rooms.find((val) => val.id == id))),
  }
  const consumptionSheetRepositoryMock = {
    save: jest.fn((consumptionSheet: ConsumptionSheet) => consumptionSheet),
    findOneBy: jest.fn(({ id }) => consumptionSheets.find(el => el.id == id))
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
    // jest.clearAllMocks()
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should CREATE a new entity', async () => {
    const newConsumptionSheet: CreateConsumptionSheetDto = {
      patient_id: 1,
      room_id: 1,
      doctor: 'Cesar',
      diagnosis: 'Cesárea',
      admission_date: new Date(),
    }
    const created = await service.create(newConsumptionSheet)
    expect(created).toBeInstanceOf(ConsumptionSheet)
    expect(roomsServiceMock.updateRoomStatus).toHaveBeenCalled()
    expect(patientsServiceMock.findOne).toHaveBeenCalled()
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalled()
  });
  it('should NOT CREATE a new entity', async () => {
    let isError = false
    try {
      const newConsumptionSheet: CreateConsumptionSheetDto = {
        patient_id: 1,
        room_id: 1,
        doctor: '',
        diagnosis: '',
        admission_date: new Date(),
      }
      const created = await service.create(newConsumptionSheet)
      expect(created).toThrowError()
    } catch (error) {
      isError = true
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    expect(roomsServiceMock.updateRoomStatus).toHaveBeenCalledTimes(1)
    expect(patientsServiceMock.findOne).toHaveBeenCalledTimes(1)
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalledTimes(1)
    expect(isError).toBe(true)
  });
  it('should UPDATE the consumption sheet, same room', async () => {
    const updateConsumptionSheetData: UpdateConsumptionSheetDto = {
      room_id: 1,
      doctor: 'Cesar',
      diagnosis: 'cesárea',
      admission_date: new Date(),
    }
    const found = await service.update(1, updateConsumptionSheetData)
    expect(consumptionSheetRepositoryMock.findOneBy).toHaveBeenCalled()
    expect(roomsServiceMock.updateRoomStatus).toHaveBeenCalledTimes(1)
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalledTimes(2)
  })
  it('should UPDATE the consumption sheet, different room', async () => {
    const updateConsumptionSheetData: UpdateConsumptionSheetDto = {
      room_id: 2,
      doctor: 'Cesar',
      diagnosis: 'cesárea',
      admission_date: new Date(),
    }
    const found = await service.update(1, updateConsumptionSheetData)
    expect(consumptionSheetRepositoryMock.findOneBy).toHaveBeenCalledTimes(2)
    expect(roomsServiceMock.updateRoomStatus).toHaveBeenCalledTimes(3)
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalledTimes(3)
  })
  it('should NOT UPDATE the consumption sheet', async () => {
    const updateConsumptionSheetData: UpdateConsumptionSheetDto = {
      room_id: 1,
      doctor: '',
      diagnosis: 'cesárea',
      admission_date: new Date(),
    }
    try {
      const found = await service.update(1, updateConsumptionSheetData)
      expect(found).toThrowError()
      
    } catch (error) {
      expect(error.status).toBe(422)
      expect(error).toBeInstanceOf(UnprocessableEntityException)
    }
    try {
      const found = await service.update(10, updateConsumptionSheetData)
      expect(found).toThrowError()
      
    } catch (error) {
      expect(error.status).toBe(404)
      expect(error).toBeInstanceOf(NotFoundException)
    }
    expect(consumptionSheetRepositoryMock.findOneBy).toHaveBeenCalledTimes(4)
    expect(roomsServiceMock.updateRoomStatus).toHaveBeenCalledTimes(3)
    expect(consumptionSheetRepositoryMock.save).toHaveBeenCalledTimes(3)
  })
  
});
