import { plainToInstance } from 'class-transformer';
import { Inject, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';
import { ConsumptionSheet } from './entities/consumption-sheet.entity';
import * as XLSX from 'xlsx';
import { RoomsService } from 'src/rooms/rooms.service';
import { PatientsService } from 'src/patients/patients.service';
import { RoomStatus } from 'src/rooms/enums/room-status.enum';

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
  async findClosed() {
    return this.consumptionSheetRepository.find(
      {
        withDeleted: true,
        where: { deleted_at: Not(IsNull()) },
        order: {
          deleted_at: 'DESC'
        }
      }
    );
  }

  async findOne(id: number) {
    try {
      const consumptionSheet = await this.consumptionSheetRepository
        .createQueryBuilder('consumptionSheet')
        .leftJoinAndSelect('consumptionSheet.consumptions', 'consumptions', 'consumptions.deleted_at IS NULL')
        .leftJoinAndSelect('consumptions.product', 'product')
        .leftJoinAndSelect('product.category', 'category')
        .withDeleted()
        .where('consumptionSheet.id = :id', { id })
        .leftJoinAndSelect('consumptionSheet.patient', 'patient')
        .getOne();

      consumptionSheet.total = consumptionSheet.total ?? consumptionSheet.consumptions.reduce((total, val) => total + val.total, 0)
      return consumptionSheet
    } catch (error) {
      throw new NotFoundException("Consumption sheet not found");
    }
  }
  async findOneIncludingDeleted(id: number) {
    try {
      const metadata = this.consumptionSheetRepository.metadata;
      const directRelations = metadata.relations.map(relation => relation.propertyPath);
      const extraRelations = ['consumptions.product.category'];
      const relations = [...directRelations, ...extraRelations];

      const consumptionSheet = await this.consumptionSheetRepository.findOne({
        where: { id },
        relations: relations,
        withDeleted: true,
      });

      if (!consumptionSheet) {
        throw new NotFoundException("Consumption sheet not found");
      }

      // Ensure consumptions is a real array
      consumptionSheet.consumptions = Array.isArray(consumptionSheet.consumptions)
      ? consumptionSheet.consumptions
      : Object.values(consumptionSheet.consumptions || {});

      // Prevent reduce error if consumptions is empty or undefined
      if (!Array.isArray(consumptionSheet.consumptions) || consumptionSheet.consumptions.length === 0) {
        consumptionSheet.total = 0;
      } else {
        // Ensure every item has a valid total
        consumptionSheet.total = consumptionSheet.consumptions.reduce(
          (total, val) => total + (val.total ?? 0),
          0
        );
      }
      return consumptionSheet;
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
    if (errors.length > 0) {
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

  async close(id: number) {
    const consumptionSheet = await this.terminateSheet(id)
    await this.roomsService.updateRoomStatus(consumptionSheet.room_id, RoomStatus.AVAILABLE)
    return this.consumptionSheetRepository.softDelete({ id: consumptionSheet.id });
  }

  async remove(id: number) {
    const consumptionSheet = await this.findOne(id)
    await this.roomsService.updateRoomStatus(consumptionSheet.room_id, RoomStatus.AVAILABLE)
    return this.consumptionSheetRepository.delete({ id });
  }

  private async terminateSheet(id: number) {
    const consumptionSheet = await this.consumptionSheetRepository.findOne({ where: { id }, relations: ['consumptions'] })
    if (!consumptionSheet) {
      throw new NotFoundException();
    }
    // get total of each category, brute total and net total.
    const subtotal = consumptionSheet.consumptions.reduce((prev, curr) => prev + curr.total, 0)
    // const netTotal = subtotal * 1.16
    consumptionSheet.total = subtotal
    this.patientsService.remove(consumptionSheet.patient_id)
    this.consumptionSheetRepository.save(consumptionSheet)

    return consumptionSheet
  }

  async getReport(id: number) {
    const consumptionSheet = await this.findOne(id);
    const sheetData = this.prepareSheetData(consumptionSheet);

    const excelBuffer = this.generateExcelBuffer(sheetData);

    const filename = `consumption_report_${id}.xlsx`;

    return { filename, buffer: excelBuffer };
  }

  private prepareSheetData(consumptionSheet: ConsumptionSheet) {
    const sheetData: [any] = [['Product Name', 'Category', 'SAT Code', 'Quantity', 'Total']];

    for (const consumption of consumptionSheet.consumptions) {
      const productName = consumption.product?.name || 'N/A';
      const categoryName = consumption.product?.category?.name || 'N/A';
      sheetData.push([productName, categoryName, consumption.product.category.code, consumption.quantity, consumption.total]);
    }
    sheetData.push([null, null, null, `SUM (D2:D${sheetData.length})`])

    return sheetData;
  }
  private generateExcelBuffer(sheetData: any[][]) {
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Consumption Report');
    return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  }
}
