import { Product } from './../../products/entities/product.entity';
import { CHGBaseEntity } from './../../common/entities/chgBaseEntity.entity';
import { ConsumptionSheet } from './../../consumption-sheets/entities/consumption-sheet.entity';
import { Staff } from './../../staff/entities/staff.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';

@Entity()
export class ConsumptionDetail extends CHGBaseEntity{
  @ManyToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.consumptions)
  @JoinColumn()
  consumptionSheet: ConsumptionSheet;

  @Column()
  consumptionSheetId: number;

  @Column()
  productId: number;

  @ManyToOne(type => Product)
  @JoinColumn()
  product: Product;

  @Column()
  staffId: number;

  @ManyToOne(type => Staff)
  @JoinColumn()
  staff: Staff;

  @Column()
  quantity: number;

  @Column()
  total: number;
}