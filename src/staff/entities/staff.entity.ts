import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Profile } from './../../common/entities/Profile';

@Entity()
export class Staff extends Profile{
  @Column({type:'varchar'})
  telephone_number: string;

  @Column()
  job_title: string;

}
