import { Patient } from 'src/patients/entities/patient.entity';
import { ConsumptionDetail } from './../../consumption-details/entities/consumption-detail.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';
import { CHGBaseEntity } from 'src/common/entities/chgBaseEntity.entity';
import { Room } from 'src/rooms/entities/room.entity';

@Entity()
export class ConsumptionSheet extends CHGBaseEntity {
    @Column()
    patient_id: number

    @OneToOne(type => Patient, { eager: true })
    @JoinColumn()
    patient: Patient;

    @Column()
    room_id: number

    @ManyToOne(type => Room, room => room.consumptionSheets, { eager: true })
    room: Room;

    @Column()
    diagnosis: string;

    @Column()
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
