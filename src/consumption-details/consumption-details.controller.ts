import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';

@ApiTags('consumption-details')
@Controller('consumption-sheets/:consumptionSheet/consumption-details')
export class ConsumptionDetailsController {
  constructor(private readonly consumptionDetailsService: ConsumptionDetailsService) { }

  @Post()
  create(@Param('consumptionSheet') consumptionSheet: string, @Body() createConsumptionDetailDto: CreateConsumptionDetailDto) {

    return this.consumptionDetailsService.create(+consumptionSheet, createConsumptionDetailDto);
  }

  @Get()
  findAll(@Param('consumptionSheet') consumptionSheet: string) {
    return this.consumptionDetailsService.findAll(+consumptionSheet);
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
