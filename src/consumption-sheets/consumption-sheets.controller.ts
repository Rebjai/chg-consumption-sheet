import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';

@Controller('consumption-sheets')
export class ConsumptionSheetsController {
  constructor(private readonly consumptionSheetsService: ConsumptionSheetsService) {}

  @Post()
  create(@Body() createConsumptionSheetDto: CreateConsumptionSheetDto) {
    return this.consumptionSheetsService.create(createConsumptionSheetDto);
  }

  @Get()
  findAll() {
    return this.consumptionSheetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionSheetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsumptionSheetDto: UpdateConsumptionSheetDto) {
    return this.consumptionSheetsService.update(+id, updateConsumptionSheetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consumptionSheetsService.remove(+id);
  }
}
