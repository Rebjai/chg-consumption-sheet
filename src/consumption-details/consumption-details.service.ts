import { StaffService } from './../staff/staff.service';
import { ProductsService } from './../products/products.service';
import { ConsumptionSheetsService } from './../consumption-sheets/consumption-sheets.service';
import { ConsumptionDetail } from './entities/consumption-detail.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConsumptionDetailsService {
  constructor(
    @InjectRepository(ConsumptionDetail) private consumptionDetailRepository: Repository<ConsumptionDetail>,
    @Inject(ConsumptionSheetsService) private consumptionSheetsService: ConsumptionSheetsService,
    @Inject(ProductsService) private productsService: ProductsService,
    @Inject(StaffService) private staffService: StaffService,
    @Inject(UsersService) private usersService: UsersService,
  ) {
  }

  async create(consumptionId: number, createConsumptionDetailDto: CreateConsumptionDetailDto) {
    const consumptionSheet = await this.consumptionSheetsService.findOne(consumptionId ? consumptionId : createConsumptionDetailDto.consumption_sheet_id)
    if (consumptionSheet.total) {
      return null
    }
    const product = await this.productsService.findOne(createConsumptionDetailDto.product_id)
    const staff = createConsumptionDetailDto.staff_id == 0 ? null : await this.staffService.findOne(createConsumptionDetailDto.staff_id)
    const user = await this.usersService.findOne(createConsumptionDetailDto.user_id)
    const consumptionDetail = new ConsumptionDetail()
    consumptionDetail.consumption_sheet = consumptionSheet
    consumptionDetail.product = product
    consumptionDetail.staff = staff
    consumptionDetail.user = user
    consumptionDetail.quantity = createConsumptionDetailDto.quantity
    consumptionDetail.total = product.price * createConsumptionDetailDto.quantity
    return await this.consumptionDetailRepository.save(consumptionDetail)

    // consumptionSheet.consumptions.push(consumptionDetail)
    // return consumptionDetail;
  }

  async findAll(consumption_sheet_id?: number) {
    if (consumption_sheet_id) {
      return this.consumptionDetailRepository.find({ where: { consumption_sheet_id }, relations: ['product'], order: { created_at: 'DESC' } });
    }
    return this.consumptionDetailRepository.find({ relations: ['product', 'consumption_sheet'], order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    const consumptionDetail = await this.consumptionDetailRepository.findOneBy({ id })
    if (!consumptionDetail)
      throw new NotFoundException("Consumption Detail not found");

    return consumptionDetail;
  }

  async update(id: number, updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    const consumptionDetail = await this.consumptionDetailRepository.update({ id }, updateConsumptionDetailDto)
    return consumptionDetail;
  }

  async remove(id: number) {
    return await this.consumptionDetailRepository.softDelete({ id });
  }
}
