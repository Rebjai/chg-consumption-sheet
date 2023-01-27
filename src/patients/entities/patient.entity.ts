import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Patient extends CHGBaseEntity{
    @Column()
    firstSurname: string;

    @Column()
    secondSurname: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: Date;

    @Column({default: true})
    active: Boolean

}
