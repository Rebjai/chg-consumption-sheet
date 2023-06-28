import { Product } from './../../products/entities/product.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { Staff } from './../../staff/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Area extends CHGBaseEntity{
    @Column()
    name: string;

}
