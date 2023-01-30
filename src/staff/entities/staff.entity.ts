import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Staff extends CHGBaseEntity {
  @Column()
  name: string;

  @Column()
  firstSurname: string;
  
  @Column()
  secondSurname: string;

  @Column()
  telephoneNumber: string;

  @Column()
  jobTitle: string;

  @Column()
  dateOfBirth: Date

  @ManyToOne(type => User)
  user?: User;

}
