import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { CHGBaseEntity } from 'src/common/entities/chgBaseEntity.entity';
import { ConsumptionSheet } from 'src/consumption/consumption-sheets/entities/consumption-sheet.entity';
import { Area } from 'src/areas/domain/entities/area.entity';
import { Product } from 'src/inventory/products/entities/product.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Entity()
export class ConsumptionDetail extends CHGBaseEntity{
  @ManyToOne(type => ConsumptionSheet, consumptionSheet => consumptionSheet.consumptions)
  @JoinColumn()
  consumption_sheet: ConsumptionSheet;

  @Column()
  consumption_sheet_id: number;

  @Column({type: 'int', nullable: true})
  area_id? : number

  @ManyToOne(type => Area)
  @JoinColumn()
  area?: Area;

  @Column()
  product_id: number;

  @ManyToOne(type => Product)
  @JoinColumn()
  product: Product;

  @Column({nullable: true})
  staff_id: number;

  @ManyToOne(type => Staff)
  @JoinColumn()
  staff: Staff;

  @Column({nullable: false})
  user_id: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => User)
  @JoinColumn()
  deleted_by?: User;

  @Column({nullable: true})
  deleted_by_id?: number;

  @Column()
  quantity: number;

  @Column()
  total: number;
}