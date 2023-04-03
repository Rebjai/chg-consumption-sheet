import { ProductSatCategoryQueryDto } from './dto/product-sat-category-query.dto';
import { PaginationDto } from './../common/dto/pagination.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindManyOptions, ILike, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateProductSatCategoryDto } from './dto/create-product-sat-category.dto';
import { UpdateProductSatCategoryDto } from './dto/update-product-sat-category.dto';
import { ProductSatCategory } from './entities/product-sat-category.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductSatCategoryService {
  constructor(@InjectRepository(ProductSatCategory) private productsRepository: Repository<ProductSatCategory>) { }
  async create(createProductSatCategoryDto: CreateProductSatCategoryDto) {
    const errors = await validate(plainToInstance(CreateProductSatCategoryDto, createProductSatCategoryDto))
    if (errors.length > 0) {
      throw new BadRequestException();
    }
    const product = new ProductSatCategory()
    product.code = createProductSatCategoryDto.code
    product.name = createProductSatCategoryDto.name
    return await this.productsRepository.save(product);
  }

  async findAll(productQuery?: ProductSatCategoryQueryDto, pagination: PaginationDto = new PaginationDto()): Promise<Pagination<ProductSatCategory>> {
    if (productQuery?.q) {
      const options: FindManyOptions<ProductSatCategory> = {}
      options.where = [
        { name: ILike(`%${productQuery.q}%`) },
        
      ]
      if (parseInt(productQuery.q)) {
        options.where.push({ code: +productQuery.q })
      }
      const response: Pagination<ProductSatCategory> = await paginate<ProductSatCategory>(this.productsRepository, pagination, options)
      return response
    }
    return paginate<ProductSatCategory>(this.productsRepository, pagination)
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    return product
  }

  async update(id: number, updateProductSatCategoryDto: UpdateProductSatCategoryDto) {
    const product: ProductSatCategory = await this.productsRepository.findOneBy({ id })
    if (!product) {
      throw new NotFoundException();
    }
    const errors = await validate(plainToInstance(UpdateProductSatCategoryDto, updateProductSatCategoryDto))
    if (errors.length > 0) {
      throw new BadRequestException();
    }
    product.name = updateProductSatCategoryDto.name
    product.code = updateProductSatCategoryDto.code
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.softDelete({ id });
  }
}
