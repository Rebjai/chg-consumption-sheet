import { CreateDateColumn, DeleteDateColumn, Entity, EntitySchema, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CHGBaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}