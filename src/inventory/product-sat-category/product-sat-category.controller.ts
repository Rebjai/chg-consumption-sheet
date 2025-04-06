import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query } from '@nestjs/common';
import { ProductSatCategoryService } from './product-sat-category.service';
import { CreateProductSatCategoryDto } from './dto/create-product-sat-category.dto';
import { UpdateProductSatCategoryDto } from './dto/update-product-sat-category.dto';
import { ProductSatCategoryQueryDto } from './dto/product-sat-category-query.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiResponseInterceptor } from 'src/common/interceptors/api-response.interceptor';

@Controller('product-sat-category')
@UseInterceptors(ApiResponseInterceptor)
export class ProductSatCategoryController {
  constructor(private readonly productSatCategoryService: ProductSatCategoryService) {}

  @Post()
  create(@Body() createProductSatCategoryDto: CreateProductSatCategoryDto) {
    return this.productSatCategoryService.create(createProductSatCategoryDto);
  }

  @Get()
  findAll(@Query() productSatCategoryQueryDto: ProductSatCategoryQueryDto,@Query() pagination: PaginationDto) {
    return this.productSatCategoryService.findAll(productSatCategoryQueryDto, pagination);
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
