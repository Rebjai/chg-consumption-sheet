import { Area } from './../../areas/entities/area.entity';
import { RoomStatus } from '../enums/room-status.enum';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { RoomType } from '../enums/room-type.enum';
import { ConsumptionSheet } from 'src/consumption/consumption-sheets/entities/consumption-sheet.entity';

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

  @Column({type: 'int', nullable: true })
  area_id? : number

  @ManyToOne(type => Area)
  area: Area;

}
