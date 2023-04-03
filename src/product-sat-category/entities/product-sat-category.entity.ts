import { Product } from './../../products/entities/product.entity';
import { CHGBaseEntity } from "src/common/entities/chgBaseEntity.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
export class ProductSatCategory extends CHGBaseEntity {

    @Column({type: 'bigint'})
    @Index()
    code: number

    @Column()
    name: string

    @OneToMany(() => Product, (product) => product.category)
    products?: Product[];
}
