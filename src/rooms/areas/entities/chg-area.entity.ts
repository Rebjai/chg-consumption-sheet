import { ConsumptionSheet } from '../../../consumption-sheets/entities/consumption-sheet.entity';
import { CHGBaseEntity } from '../../../common/entities/chgBaseEntity.entity';
import { Entity, Column, OneToMany, } from 'typeorm';
import { RoomType } from '../../enums/room-type.enum';

@Entity()
export class Area extends CHGBaseEntity{

  @Column()
  name: string;
}
