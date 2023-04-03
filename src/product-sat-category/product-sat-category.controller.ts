import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductSatCategoryService } from './product-sat-category.service';
import { CreateProductSatCategoryDto } from './dto/create-product-sat-category.dto';
import { UpdateProductSatCategoryDto } from './dto/update-product-sat-category.dto';

@Controller('product-sat-category')
export class ProductSatCategoryController {
  constructor(private readonly productSatCategoryService: ProductSatCategoryService) {}

  @Post()
  create(@Body() createProductSatCategoryDto: CreateProductSatCategoryDto) {
    return this.productSatCategoryService.create(createProductSatCategoryDto);
  }

  @Get()
  findAll() {
    return this.productSatCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSatCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductSatCategoryDto: UpdateProductSatCategoryDto) {
    return this.productSatCategoryService.update(+id, updateProductSatCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSatCategoryService.remove(+id);
  }
}
