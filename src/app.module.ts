import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { StaffModule } from './staff/staff.module';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ormAsyncConfig } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AreasModule } from './areas/areas.module';
import { ReportsModule } from './reports/reports.module';
import { PrinterModule } from './printer/printer.module';
import { ProductsModule } from './inventory/products/products.module';
import { ConsumptionSheetsModule } from './consumption/consumption-sheets/consumption-sheets.module';
import { ConsumptionDetailsModule } from './consumption/consumption-details/consumption-details.module';
import { ProductSatCategoryModule } from './inventory/product-sat-category/product-sat-category.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client'),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(ormAsyncConfig),
    RoomsModule,
    ProductsModule,
    StaffModule,
    ConsumptionSheetsModule,
    PatientsModule,
    ConsumptionDetailsModule,
    UsersModule,
    AuthModule,
    ProductSatCategoryModule,
    AreasModule,
    ReportsModule,
    PrinterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
