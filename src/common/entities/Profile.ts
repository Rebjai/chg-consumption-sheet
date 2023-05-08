import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { CHGBaseEntity } from "./chgBaseEntity.entity"

@Entity()
export abstract class Profile extends CHGBaseEntity {
    @Column({type:'varchar'})
    name: string;

    @Column({type:'varchar'})
    first_surname: string;
    
    @Column({type:'varchar'})
    second_surname: string;

    @Column()
    date_of_birth: Date

    @Column({type:'bigint', unsigned: true, nullable:true})
    user_id?: number;

    @ManyToOne(type => User)
    user?: User;

}