import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put, Request } from '@nestjs/common';
import { ConsumptionDetailsService } from './consumption-details.service';
import { CreateConsumptionDetailDto } from './dto/create-consumption-detail.dto';
import { UpdateConsumptionDetailDto } from './dto/update-consumption-detail.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/api-response.interceptor';
import UserRole from 'src/users/enums/user-role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('consumption-details')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ApiResponseInterceptor)
@Controller(['consumption-sheets/:consumptionSheet/consumption-details', 'consumption-details'])
export class ConsumptionDetailsController {
  constructor(private readonly consumptionDetailsService: ConsumptionDetailsService) { }

  @Post()
  create(
    @Param('consumptionSheet') consumptionSheet: string,
    @Body() createConsumptionDetailDto: CreateConsumptionDetailDto,
    @Request() req) {
    createConsumptionDetailDto.user_id = req.user.userId
    return this.consumptionDetailsService.create(+consumptionSheet, createConsumptionDetailDto);
  }

  @Get()
  findAll(@Param('consumptionSheet') consumptionSheet?: string) {
    if (consumptionSheet)
      return this.consumptionDetailsService.findAll(+consumptionSheet);
    return this.consumptionDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consumptionDetailsService.findOne(+id);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateConsumptionDetailDto: UpdateConsumptionDetailDto) {
    return this.consumptionDetailsService.update(+id, updateConsumptionDetailDto);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR, UserRole.USER)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId
    return this.consumptionDetailsService.remove(+id, +userId);
  }
}
