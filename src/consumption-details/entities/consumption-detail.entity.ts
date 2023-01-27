import { Product } from './../../products/entities/product.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { Staff } from './../../staff/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ConsumptionDetail extends CHGBaseEntity{
  @ManyToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.consumptions)
  consumptionSheet: ConsumptionSheet;

  @ManyToOne(type => Product)
  product: Product;

  @ManyToOne(type => Staff)
  staff: Staff;

  @Column()
  quantity: number;
}