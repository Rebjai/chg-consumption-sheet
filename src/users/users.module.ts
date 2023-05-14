import BcryptHashService from '../auth/bcrypt-hash.service';
import { AuthModule } from './../auth/auth.module';
import { StaffModule } from './../staff/staff.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), StaffModule,],
  controllers: [UsersController],
  providers: [UsersService, BcryptHashService],
  exports: [UsersService],
})
export class UsersModule {}
