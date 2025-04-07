import { Area } from 'src/areas/domain/entities/area.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Patient } from "src/patients/entities/patient.entity"
import { Room } from "src/rooms/entities/room.entity"
import { Staff } from "src/staff/entities/staff.entity"
import { User } from "src/users/entities/user.entity"
import { DatabaseType, DataSourceOptions } from "typeorm"
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Product } from 'src/inventory/products/entities/product.entity';
import { ConsumptionDetail } from 'src/consumption/consumption-details/entities/consumption-detail.entity';
import { ConsumptionSheet } from 'src/consumption/consumption-sheets/entities/consumption-sheet.entity';
import { ProductSatCategory } from 'src/inventory/product-sat-category/entities/product-sat-category.entity';

const ormConfig: DataSourceOptions | TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chg',
    password: 'chg_pass',
    database: 'chg_consumption_sheet',
    entities: [User, Room, Patient, Staff, Product, ConsumptionDetail, ConsumptionSheet, Area],
    // dropSchema:true,
}
const ormAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: configService.get<DatabaseType>('DB_DRIVER') as "postgres" | "mysql" | "mariadb",
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Room, Patient, Staff, Product, ProductSatCategory, ConsumptionDetail, ConsumptionSheet, Area],
        namingStrategy: new SnakeNamingStrategy(),
        // synchronize: true,
    }),
};

export default ormConfig
export { ormConfig, ormAsyncConfig }
