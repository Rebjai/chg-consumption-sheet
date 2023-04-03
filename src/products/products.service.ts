import { PaginationDto } from './../common/dto/pagination.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindManyOptions, ILike, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }
  async create(createProductDto: CreateProductDto) {
    const errors = await validate(plainToInstance(CreateProductDto, createProductDto))
    if (errors.length > 0) {
      throw new BadRequestException();
    }
    const product = new Product()
    product.price = createProductDto.price
    product.name = createProductDto.name
    product.category_id = createProductDto.category_id
    return await this.productsRepository.save(product);
  }

  async findAll(productQuery?: ProductQueryDto, pagination: PaginationDto = new PaginationDto()): Promise<Pagination<Product>> {
    if (productQuery) {
      const options: FindManyOptions<Product> = {}
      options.where = { name: ILike(`%${productQuery.name}%`) }
      if (productQuery.price_filter == 'lt') {
        options.where = { ...options.where, price: LessThanOrEqual(productQuery.price) }
      } else {
        options.where = { ...options.where, price: MoreThanOrEqual(productQuery.price) }
      }
      const response: Pagination<Product> = await paginate<Product>(this.productsRepository, pagination, options)
      return response
    }
    return paginate<Product>(this.productsRepository, pagination, {order:{name:'DESC',id:'DESC'}})
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product: Product = await this.productsRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException();
    }
    const errors = await validate(plainToInstance(UpdateProductDto, updateProductDto))
    if (errors.length > 0) {
      throw new BadRequestException();
    }
    product.name = updateProductDto.name
    product.price = updateProductDto.price
    product.category_id = updateProductDto.category_id
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.softDelete({ id });
  }
}
