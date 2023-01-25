import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { User } from './../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Staff extends CHGBaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  jobTitle: string;

  @ManyToOne(type => User)
  user: User;

}
