import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAreaDto } from '../application/dto/create-area.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiResponseInterceptor } from 'src/common/interceptors/api-response.interceptor';
import { Roles } from 'src/common/decorators/roles.decorator';
import UserRole from 'src/users/enums/user-role.enum';
import { CreateAreaCommand } from '../application/commands/create-area.command';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { GetAreaByIdQuery } from '../application/queries/get-area-by-id.query';
import { UpdateAreaDto } from '../application/dto/update-area.dto';
import { GetAllAreasQuery } from '../application/queries/get-all-areas.query';
import { UpdateAreaCommand } from '../application/commands/update-area.command';
import { RemoveAreaCommand } from '../application/commands/remove-area.command';

@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ApiResponseInterceptor)
@Controller('areas')
export class AreasController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.commandBus.execute(new CreateAreaCommand(createAreaDto.name));
  }

  @Get()
  findAll(@Query() pagination?: PaginationDto) {
    return this.queryBus.execute(new GetAllAreasQuery(pagination));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetAreaByIdQuery(+id));
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAreaDto: UpdateAreaDto) {
    return this.commandBus.execute(new UpdateAreaCommand(+id, updateAreaDto.name));
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new RemoveAreaCommand(+id));
  }
}
