import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstSurname: string;

    @Column()
    secondSurname: string;

    @Column()
    name: string;

    @Column()
    dateOfBirth: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
