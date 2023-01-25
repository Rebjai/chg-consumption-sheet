import { PatientsService } from './../patients/patients.service';
import { RoomsService } from './../rooms/rooms.service';
import { HttpException, Inject, Injectable, HttpStatus } from '@nestjs/common';
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
  ) {}

  async create(createConsumptionSheetDto: CreateConsumptionSheetDto): Promise<ConsumptionSheet> {
    const errors = await validate(createConsumptionSheetDto);
    if (errors.length > 0) {
      throw new HttpException({ message: 'Invalid data', errors }, HttpStatus.BAD_REQUEST);
    }
    const consumptionSheet = new ConsumptionSheet();
    consumptionSheet.patient = await this.patientsService.findOne(createConsumptionSheetDto.patient_id);
    consumptionSheet.room = await this.roomsService.findOne(createConsumptionSheetDto.room_id)
    consumptionSheet.diagnosis = createConsumptionSheetDto.diagnosis;
    consumptionSheet.doctor = createConsumptionSheetDto.doctor;
    consumptionSheet.admissionDate = createConsumptionSheetDto.admission_date;
    return await this.consumptionSheetRepository.save(consumptionSheet);
  }

  findAll() {
    return `This action returns all consumptionSheets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionSheet`;
  }

  update(id: number, updateConsumptionSheetDto: UpdateConsumptionSheetDto) {
    return `This action updates a #${id} consumptionSheet`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumptionSheet`;
  }
}
