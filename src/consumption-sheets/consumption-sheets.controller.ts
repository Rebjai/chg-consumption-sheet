import UserRole from 'src/users/enums/user-role.enum';
import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put, Request, ForbiddenException, Query } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('consumption-sheets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consumption-sheets')
@UseInterceptors(ApiResponseInterceptor)
@Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
export class ConsumptionSheetsController {
  constructor(private readonly consumptionSheetsService: ConsumptionSheetsService) { }
  
  @Post()
  create(@Body() createConsumptionSheetDto: CreateConsumptionSheetDto) {
    return this.consumptionSheetsService.create(createConsumptionSheetDto);
  }
  
  @Get()
  findAll(@Query() query?: { closed?: boolean }) {
    if (query.closed!!) {
      return this.consumptionSheetsService.findClosed();
    }
    return this.consumptionSheetsService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionSheetsService.findOne(+id);
  }
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateConsumptionSheetDto: UpdateConsumptionSheetDto) {
    return this.consumptionSheetsService.update(+id, updateConsumptionSheetDto);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Delete(':id/close')
  close(@Param('id') id: string, @Request() req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();

    }
    return this.consumptionSheetsService.close(+id);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException();

    }
    return this.consumptionSheetsService.remove(+id);
  }
}
