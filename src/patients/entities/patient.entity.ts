import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Patient extends CHGBaseEntity{
    @Column()
    first_surname: string;

    @Column()
    second_surname: string;

    @Column()
    name: string;

    @Column()
    date_of_birth: Date;

    @Column({default: true})
    active: Boolean

}
