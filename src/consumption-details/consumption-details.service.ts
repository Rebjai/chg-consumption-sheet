import { Injectable } from '@nestjs/common';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';

@Injectable()
export class ConsumptionDetailsService {
  create(createConsumptionDetailDto: CreateConsumptionDetailDto) {
    return 'This action adds a new consumptionDetail';
  }

  findAll() {
    return `This action returns all consumptionDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consumptionDetail`;
  }

  update(id: number, updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    return `This action updates a #${id} consumptionDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} consumptionDetail`;
  }
}
