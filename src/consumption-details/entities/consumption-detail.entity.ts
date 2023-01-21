import { Staff } from './../../staff/entities/staff.entity';
import { ConsumptionSheet } from 'src/consumption-sheets/entities/consumption-sheet.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ConsumptionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.consumptions)
  consumptionSheet: ConsumptionSheet;

  @ManyToOne(type => Product)
  product: Product;

  @ManyToOne(type => Staff)
  staff: Staff;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}