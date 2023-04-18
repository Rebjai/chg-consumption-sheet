import { ConsumptionSheet } from 'src/consumption-sheets/entities/consumption-sheet.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
@Entity()
export class Patient extends CHGBaseEntity {
    @Column()
    first_surname: string;

    @Column()
    second_surname: string;

    @Column()
    name: string;

    @Column()
    date_of_birth: Date;

    @Column({ default: true })
    active: Boolean

    @OneToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.patient)
    consumption_sheet?: ConsumptionSheet

}
