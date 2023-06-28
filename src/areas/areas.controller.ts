import { UserRole } from './../users/enums/user-role.enum';
import { Roles } from './../common/decorators/roles.decorator';
import { RolesGuard } from './../auth/guards/roles.guard';
import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ApiResponseInterceptor)
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }
  
  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areasService.findOne(+id);
  }
  
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.areasService.update(+id, updateAreaDto);
  }
  
  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.areasService.remove(+id);
  }
}
