import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Profile } from 'src/common/entities/Profile';
import UserRole from '../enums/user-role.enum';

@Entity()
export class User extends CHGBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role?: UserRole;

  @Column({ nullable: true })
  rt?: string

  @OneToOne(valtype => Staff, profile => profile.user, { eager: true })
  profile: Staff

}

