import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { ConsumptionDetail } from './../../consumption-details/entities/consumption-detail.entity';
import { Product } from './../../products/entities/product.entity';
import { Staff } from './../../staff/entities/staff.entity';
import { Patient } from './../../patients/entities/patient.entity';
import { Room } from './../../rooms/entities/room.entity';
import { User } from './../../users/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenvExpand.expand(dotenv.config());
const ormConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/entities/*.entity.js'],
    namingStrategy: new SnakeNamingStrategy(),
    // dropSchema:true,
    migrations: ['dist/src/common/db/migrations/*Migration.js']
}
export default new DataSource(ormConfig)
export { ormConfig }
