import UserRole from 'src/users/enums/user-role.enum';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put, Request, ForbiddenException, Query, Res, Logger, NotFoundException } from '@nestjs/common';
import { ConsumptionSheetsService } from './consumption-sheets.service';
import { CreateConsumptionSheetDto } from './dto/create-consumption-sheet.dto';
import { UpdateConsumptionSheetDto } from './dto/update-consumption-sheet.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/api-response.interceptor';

@ApiTags('consumption-sheets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('consumption-sheets')
@UseInterceptors(ApiResponseInterceptor)
@Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
export class ConsumptionSheetsController {
  private readonly logger = new Logger(ConsumptionSheetsController.name);

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
    if (req.user.role !== UserRole.ADMIN && req.user.role != UserRole.SUPERVISOR) {
      console.log('forb');
      
      throw new ForbiddenException();
      
    }
    return this.consumptionSheetsService.close(+id);
  }
  
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SUPERVISOR) {
      throw new ForbiddenException();

    }
    return this.consumptionSheetsService.remove(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Get(':id/report')
  async downloadReport(@Param('id') id: number, @Res() res: Response) {
    try {
      const { filename, buffer } = await this.consumptionSheetsService.getReport(id);

      res.set({
        'Content-Disposition': `attachment; filename=${filename}`,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      res.end(buffer);

      // Log successful downloads
      this.logger.log(`Downloaded report for ID ${id}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ error: 'Report not found' });
      } else {
        res.status(500).json({ error: 'An error occurred while generating the report' });
        // Log failed downloads
        this.logger.error(`Error while downloading report for ID ${id}: ${error.message}`);
      }
    }
  }
}
