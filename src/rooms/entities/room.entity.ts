import { ConsumptionSheet } from 'src/consumption-sheets/entities/consumption-sheet.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany( type => ConsumptionSheet, consumptionSheet => consumptionSheet.room)
  consumptionSheets: ConsumptionSheet

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
