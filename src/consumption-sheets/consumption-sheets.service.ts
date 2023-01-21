import { Injectable } from '@nestjs/common';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';

@Injectable()
export class ConsumptionSheetsService {
  create(createConsumptionSheetDto: CreateConsumptionSheetDto) {
    return 'This action adds a new consumptionSheet';
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
