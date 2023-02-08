import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import BcryptHashService from './bcrypt-hash.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ChgHashService } from "./Interfaces/chg-hash-service.Interface";
@Module({
  controllers: [AuthController],
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: 'YES',
    signOptions: { expiresIn: '3000s' }
  })],
  providers: [AuthService, BcryptHashService, LocalStrategy, JwtStrategy]
})
export class AuthModule { }
