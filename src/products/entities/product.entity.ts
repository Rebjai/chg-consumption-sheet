import { ProductSatCategory } from 'src/product-sat-category/entities/product-sat-category.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToOne, ManyToOne } from 'typeorm';

@Entity()
export class Product extends CHGBaseEntity{
    @Column()
    name: string;

    @Column({type:'decimal'})
    price: number;
    
    @Column({nullable: true})
    category_id?: number;
    
    @ManyToOne((type)=>ProductSatCategory, {eager: true})
    category?: ProductSatCategory
}
