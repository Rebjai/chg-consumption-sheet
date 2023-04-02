import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Product extends CHGBaseEntity{
    @Column()
    name: string;

    @Column({type:'decimal'})
    price: number;

}
