import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PaginationDto } from './../common/dto/pagination.dto';
import { QueryRoomDto } from './dto/query-room.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards, UseInterceptors, Put } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rooms')
@UseGuards(JwtAuthGuard)
@Controller('rooms')
@UseInterceptors(ApiResponseInterceptor)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }
  @Get()
  findAll(@Query() query?: QueryRoomDto, @Query() pagination? : PaginationDto) {
    return this.roomsService.findAll(query, pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }
  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
