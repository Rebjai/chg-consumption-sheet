import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from "typeorm";
import { CHGBaseEntity } from "./chgBaseEntity.entity"

@Entity()
export abstract class Profile extends CHGBaseEntity {
    @Column()
    name: string;

    @Column()
    first_surname: string;

    @Column()
    second_surname: string;

    @Column()
    date_of_birth: Date

    @Column({nullable:true})
    user_id?: number;

    @ManyToOne(type => User)
    user?: User;

}