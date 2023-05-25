import { Roles } from './../common/decorators/roles.decorator';
import { RolesGuard } from './../auth/guards/roles.guard';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Delete, UseGuards, UseInterceptors, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserRole from './enums/user-role.enum';

@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
@UseInterceptors(ApiResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto | UpdateUserByAdminDto, @Request() req) {
    console.log({ user: req.user });
    if (req.user.userId == id) {
      return this.usersService.updateAccount(+id, updateUserDto);
    }
    if (req.user.role == UserRole.ADMIN) {
      return this.usersService.updateByAdmin(+id, updateUserDto);
    }


    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(UserRole.ADMIN, UserRole.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
