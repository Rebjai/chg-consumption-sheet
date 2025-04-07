import { CHGBaseEntity } from '../../../common/entities/chgBaseEntity.entity';
import { Entity, Column} from 'typeorm';

@Entity()
export class Area extends CHGBaseEntity{
    @Column()
    name: string;

}
