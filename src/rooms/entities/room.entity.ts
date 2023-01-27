import { RoomStatus } from '../enums/room-status.enum';
import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, Column, OneToMany, } from 'typeorm';
import { RoomType } from '../enums/room-type.enum';

@Entity()
export class Room extends CHGBaseEntity{

  @Column()
  name: string;

  @Column()
  status: RoomStatus;

  @Column()
  type: RoomType;

  @OneToMany( type => ConsumptionSheet, consumptionSheet => consumptionSheet.room)
  consumptionSheets?: ConsumptionSheet
  
}
