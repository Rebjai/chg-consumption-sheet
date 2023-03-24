import { CreatedByAdminDto } from './dtos/created-by-admin.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Tokens } from './types/tokens.type';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards, HttpStatus, HttpCode, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() auth : AuthDto) {
        return this.authService.login(req.user);
    }
    
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  registerUser(@Body() dto: CreateUserDto): Promise<Tokens> {
    return this.authService.register(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Post('register-by-admin')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  registerUserByAdmin(@Body() dto: CreatedByAdminDto, @Request() req): Promise<Tokens> {
    // req.user.role ==
    return this.authService.registerByAdmin(dto);
  }
  
}
