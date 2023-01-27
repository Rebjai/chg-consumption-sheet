import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }
  async create(createProductDto: CreateProductDto) {
    const product = new Product()
    product.price = createProductDto.price
    product.name = createProductDto.name
    return await this.productsRepository.save(product);
  }

  async findAll() {
    const products: Product[] = await this.productsRepository.find()
    return products;
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOneBy({ id })
    product.name = updateProductDto.name
    product.price = updateProductDto.price
    return this.productsRepository.save(product);
  }

  async remove(id: number) {
    return this.productsRepository.softDelete({ id });
  }
}
