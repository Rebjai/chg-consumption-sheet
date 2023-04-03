import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductSatCategoryService } from './product-sat-category.service';
import { ProductSatCategoryController } from './product-sat-category.controller';
import { ProductSatCategory } from './entities/product-sat-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductSatCategory])
  ],
  controllers: [ProductSatCategoryController],
  providers: [ProductSatCategoryService]
})
export class ProductSatCategoryModule {}
