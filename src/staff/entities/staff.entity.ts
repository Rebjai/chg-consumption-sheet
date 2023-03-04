import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Staff extends CHGBaseEntity {
  @Column()
  name: string;

  @Column()
  first_surname: string;
  
  @Column()
  second_surname: string;

  @Column()
  telephone_number: string;

  @Column()
  job_title: string;

  @Column()
  date_of_birth: Date

  @ManyToOne(type => User)
  user?: User;

}
