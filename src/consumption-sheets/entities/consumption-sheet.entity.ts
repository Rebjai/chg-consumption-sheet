import { ConsumptionDetail } from './../../consumption-details/entities/consumption-detail.entity';
import { Room } from './../../rooms/entities/room.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Patient } from './../../patients/entities/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class ConsumptionSheet extends CHGBaseEntity {
    @Column({type:'bigint', unsigned: true, unique:true})
    patient_id: number

    @OneToOne(type => Patient, { eager: true })
    @JoinColumn()
    patient: Patient;

    @Column({type:'bigint', unsigned: true})
    room_id: number

    @ManyToOne(type => Room, room => room.consumptionSheets, { eager: true })
    room: Room;

    @Column()
    diagnosis: string;

    @Column({type: 'varchar'})
    doctor: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 , nullable: true})
    total?: number;

    @Column({ nullable: true })
    discharge_date: Date;

    @Column()
    admission_date: Date;

    @OneToMany(type => ConsumptionDetail, consumption => consumption.consumption_sheet)
    consumptions?: ConsumptionDetail[]
}
