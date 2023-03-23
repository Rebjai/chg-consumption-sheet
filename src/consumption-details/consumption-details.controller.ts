import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';

@ApiTags('consumption-details')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ApiResponseInterceptor)
@Controller(['consumption-sheets/:consumptionSheet/consumption-details', 'consumption-details'])
export class ConsumptionDetailsController {
  constructor(private readonly consumptionDetailsService: ConsumptionDetailsService) { }

  @Post()
  create(@Param('consumptionSheet') consumptionSheet: string, @Body() createConsumptionDetailDto: CreateConsumptionDetailDto) {

    return this.consumptionDetailsService.create(+consumptionSheet, createConsumptionDetailDto);
  }

  @Get()
  findAll(@Param('consumptionSheet') consumptionSheet?: string) {
    if(consumptionSheet)
    return this.consumptionDetailsService.findAll(+consumptionSheet);
    return this.consumptionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionDetailsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    return this.consumptionDetailsService.update(+id, updateConsumptionDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionDetailsService.remove(+id);
  }
}
