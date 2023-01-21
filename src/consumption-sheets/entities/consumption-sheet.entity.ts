import { ConsumptionDetail } from 'src/consumption-details/entities/consumption-detail.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ConsumptionSheet {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => Patient)
    patient: Patient;

    @ManyToOne(type => Room, room => room.consumptionSheets)
    room: Room;


    @Column()
    dischargeDate: Date;

    @Column()
    admissionDate: Date;

    @OneToMany(type => ConsumptionDetail, consumption => consumption.consumptionSheet)
    consumptions: ConsumptionDetail[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
