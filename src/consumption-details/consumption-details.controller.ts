import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';

@Controller('consumption-details')
export class ConsumptionDetailsController {
  constructor(private readonly consumptionDetailsService: ConsumptionDetailsService) {}

  @Post()
  create(@Body() createConsumptionDetailDto: CreateConsumptionDetailDto) {
    return this.consumptionDetailsService.create(createConsumptionDetailDto);
  }

  @Get()
  findAll() {
    return this.consumptionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    return this.consumptionDetailsService.update(+id, updateConsumptionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionDetailsService.remove(+id);
  }
}
