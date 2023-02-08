import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { ProductsModule } from './products/products.module';
import { StaffModule } from './staff/staff.module';
import { ConsumptionSheetsModule } from './consumption-sheets/consumption-sheets.module';
import { PatientsModule } from './patients/patients.module';
import { ConsumptionDetailsModule } from './consumption-details/consumption-details.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import ormConfig from '../ormconfig'
@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),RoomsModule, ProductsModule, StaffModule, ConsumptionSheetsModule, PatientsModule, ConsumptionDetailsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
