import { CreateDateColumn, DeleteDateColumn, Entity, EntitySchema, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CHGBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @DeleteDateColumn()
    deleted_at?: Date;
}