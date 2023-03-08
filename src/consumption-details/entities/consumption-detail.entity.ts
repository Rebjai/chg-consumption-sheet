import { Product } from './../../products/entities/product.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { Staff } from './../../staff/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class ConsumptionDetail extends CHGBaseEntity{
  @ManyToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.consumptions)
  @JoinColumn()
  consumption_sheet: ConsumptionSheet;

  @Column()
  consumption_sheet_id: number;

  @Column()
  product_id: number;

  @ManyToOne(type => Product)
  @JoinColumn()
  product: Product;

  @Column()
  staff_id: number;

  @ManyToOne(type => Staff)
  @JoinColumn()
  staff: Staff;

  @Column()
  quantity: number;

  @Column()
  total: number;
}