import { TypeOrmModuleOptions } from "@nestjs/typeorm"
import { ConsumptionDetail } from "src/consumption-details/entities/consumption-detail.entity"
import { ConsumptionSheet } from "src/consumption-sheets/entities/consumption-sheet.entity"
import { Patient } from "src/patients/entities/patient.entity"
import { Product } from "src/products/entities/product.entity"
import { Room } from "src/rooms/entities/room.entity"
import { Staff } from "src/staff/entities/staff.entity"
import { User } from "src/users/entities/user.entity"

const ormConfig : TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chg',
    password: 'chg_pass',
    database: 'chg_consumption_sheet',
    entities: [User, Room, Patient, Staff, Product, ConsumptionDetail, ConsumptionSheet],
    synchronize: true,
}
export default ormConfig
export { ormConfig }
