import { ApiResponseInterceptor } from './../common/interceptors/api-response.interceptor';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { PaginationDto } from './../common/dto/pagination.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, UseInterceptors, Put, StreamableFile, Header } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@UseGuards(JwtAuthGuard)
@Controller('products')
@UseInterceptors(ApiResponseInterceptor)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() productQuery: ProductQueryDto, @Query() pagination: PaginationDto) {
    pagination.route = '/products'
    return this.productsService.findAll(productQuery, pagination);
  }

  @Get('download')
  @Header('Content-Type', 'text/csv')
  async downloadFile(@Query() query: ProductQueryDto, @Query('format') format: 'csv' | 'xlsx' = 'csv'): Promise<StreamableFile> {
    console.log({query}, {format});
    return this.productsService.downloadFile(query, format);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
