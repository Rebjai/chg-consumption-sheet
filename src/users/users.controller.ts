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
@UseGuards(JwtAuthGuard)
@Controller('users')
@UseInterceptors(ApiResponseInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

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
    console.log({user: req.user});
    if (req.user.userId == id) {
      return this.usersService.updateAccount(+id, updateUserDto);
    }
    if (req.user.role == UserRole.ADMIN) {
      console.log('adminz');
      return this.usersService.updateByAdmin(+id, updateUserDto);
    }
    
    console.log('normal');

    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
