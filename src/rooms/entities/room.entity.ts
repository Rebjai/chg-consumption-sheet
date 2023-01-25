import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, Column, OneToMany, } from 'typeorm';

@Entity()
export class Room extends CHGBaseEntity{

  @Column()
  name: string;

  @Column()
  status: string;

  @OneToMany( type => ConsumptionSheet, consumptionSheet => consumptionSheet.room)
  consumptionSheets?: ConsumptionSheet
  
}
