import { plainToInstance } from 'class-transformer';
import { RoomStatus } from './../rooms/enums/room-status.enum';
import { PatientsService } from './../patients/patients.service';
import { RoomsService } from './../rooms/rooms.service';
import { HttpException, Inject, Injectable, HttpStatus, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';

@Injectable()
export class ConsumptionSheetsService {
  constructor(
    @InjectRepository(ConsumptionSheet)
    private consumptionSheetRepository: Repository<ConsumptionSheet>,
    @Inject(RoomsService)
    private roomsService: RoomsService,
    @Inject(PatientsService)
    private patientsService: PatientsService,
  ) { }

  async create(createConsumptionSheetDto: CreateConsumptionSheetDto): Promise<ConsumptionSheet> {
    const errors = await validate(plainToInstance(CreateConsumptionSheetDto, createConsumptionSheetDto));
    if (errors.length > 0) {
      throw new UnprocessableEntityException;
    }
    const consumptionSheet = new ConsumptionSheet();
    consumptionSheet.patient = await this.patientsService.findOne(createConsumptionSheetDto.patient_id);
    consumptionSheet.room = await this.roomsService.updateRoomStatus(createConsumptionSheetDto.room_id, RoomStatus.OCCUPIED)
    consumptionSheet.diagnosis = createConsumptionSheetDto.diagnosis;
    consumptionSheet.doctor = createConsumptionSheetDto.doctor;
    consumptionSheet.admission_date = createConsumptionSheetDto.admission_date;
    return await this.consumptionSheetRepository.save(consumptionSheet);
  }

  async findAll() {
    return this.consumptionSheetRepository.find();
  }

  async findOne(id: number) {
    try {
      const consumptionSheet = await this.consumptionSheetRepository.findOneByOrFail({ id });
      return consumptionSheet
    } catch (error) {
      throw new NotFoundException("Consumption sheet not found");
    }
  }

  async update(id: number, updateConsumptionSheetDto: UpdateConsumptionSheetDto) {
    const consumptionSheet = await this.consumptionSheetRepository.findOneBy({ id })
    if (!consumptionSheet) {
      throw new NotFoundException();
    }
    const errors = await validate(plainToInstance(UpdateConsumptionSheetDto, updateConsumptionSheetDto))
    if (errors.length>0) {
      throw new UnprocessableEntityException()
    }
    if (updateConsumptionSheetDto.room_id !== consumptionSheet.room_id) {
      this.roomsService.updateRoomStatus(consumptionSheet.room.id, RoomStatus.AVAILABLE)
      consumptionSheet.room = await this.roomsService.updateRoomStatus(updateConsumptionSheetDto.room_id, RoomStatus.OCCUPIED)
    }
    consumptionSheet.diagnosis = updateConsumptionSheetDto.diagnosis;
    consumptionSheet.doctor = updateConsumptionSheetDto.doctor;
    consumptionSheet.admission_date = updateConsumptionSheetDto.admission_date;
    return await this.consumptionSheetRepository.save(consumptionSheet)
  }

  async remove(id: number) {
    const consumptionSheet = await this.consumptionSheetRepository.findOneByOrFail({ id })
    await this.roomsService.updateRoomStatus(consumptionSheet.room.id, RoomStatus.AVAILABLE)
    await this.patientsService.remove(consumptionSheet.patient.id)
    return this.consumptionSheetRepository.softDelete({ id: consumptionSheet.id });
  }
}
