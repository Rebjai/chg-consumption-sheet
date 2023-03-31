import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Put, Request } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@ApiTags('staff')
@UseGuards(JwtAuthGuard)
@Controller('staff')
@UseInterceptors(ApiResponseInterceptor)
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Get('profile')
  profile(@Request() req) {
    const userId: number = req.user.userId
    return this.staffService.getProfile(userId);
  }

  @Put('profile')
  updateProfile(@Request() req, @Body() updateStaffDto: UpdateStaffDto) {
    updateStaffDto.user_id= +req.user.userId
    console.log({user: req.user})
    console.log({ updateStaffDto });
    // -------------
    return this.staffService.update(+updateStaffDto.id, updateStaffDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(+id);
  }


}
