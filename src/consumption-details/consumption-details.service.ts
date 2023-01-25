import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ConsumptionDetailsService {
  constructor(@InjectRepository(ConsumptionDetail) private consumptionDetailRepository: Repository<ConsumptionDetail>,) {
  }

  create(createConsumptionDetailDto: CreateConsumptionDetailDto) {
    const consumptionDetail = this.consumptionDetailRepository.save(createConsumptionDetailDto)
    return consumptionDetail;
  }

  findAll() {
    return this.consumptionDetailRepository.find();
  }

  findOne(id: number) {
    return this.consumptionDetailRepository.findOneBy({id});
  }

  async update(id: number, updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    const consumptionDetail =  await this.consumptionDetailRepository.update({id}, updateConsumptionDetailDto)
    return consumptionDetail;
  }

  async remove(id: number) {
    return await this.consumptionDetailRepository.delete({id});
  }
}
