import { ConsumptionDetail } from './../../consumption-details/entities/consumption-detail.entity';
import { Room } from './../../rooms/entities/room.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Patient } from './../../patients/entities/patient.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class ConsumptionSheet extends CHGBaseEntity{
    @Column()
    patientId: number
    
    @OneToOne(type => Patient, {eager: true})
    @JoinColumn()
    patient: Patient;
    
    @Column()
    roomId: number
    
    @ManyToOne(type => Room, room => room.consumptionSheets, {eager: true})
    room: Room;
    
    @Column()
    diagnosis: string;

    @Column()
    doctor: string;
    
    @Column({nullable: true})
    dischargeDate: Date;

    @Column()
    admissionDate: Date;

    @OneToMany(type => ConsumptionDetail, consumption => consumption.consumptionSheet)
    consumptions?: ConsumptionDetail[]
}
