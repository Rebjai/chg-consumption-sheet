import  "reflect-metadata";
import { PaginationDto } from './../common/dto/pagination.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  const products: Product[] = [
    { id: 1, name: 'CS 500', price: 100, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'CS 1000', price: 150, createdAt: new Date(), updatedAt: new Date() },
  ]
  const productsRepositoryMock = {
    save: jest.fn().mockImplementation((x: Product) => x),
    findOneBy: jest.fn().mockImplementation(({ id }) => products.find(val => val.id == id) as Product),
    find: jest.fn().mockImplementation((options) => products)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        { provide: getRepositoryToken(Product), useValue: productsRepositoryMock }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE a product', async () => {
    const newProduct: CreateProductDto = { name: 'CS 500', price: 100 }
    const created = await service.create(newProduct)
    expect(created).toBeInstanceOf(Product)
    expect(productsRepositoryMock.save).toHaveBeenCalledTimes(1)
  })

  it('should NOT CREATE a product', async () => {
    try {
      const newProduct: CreateProductDto = { name: '', price: 100 }
      const created = await service.create(newProduct)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    try {
      const newProduct: CreateProductDto = { name: 'CS 500', price: null }
      const created = await service.create(newProduct)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    expect(productsRepositoryMock.save).not.toHaveBeenCalledTimes(2)
  })

  it('should UPDATE product', async () => {
    const updatedProduct: UpdateProductDto = { name: 'CS 500', price: 200 }
    const updated = await service.update(1, updatedProduct)
    expect(productsRepositoryMock.findOneBy).toHaveBeenCalledTimes(1)
    expect(productsRepositoryMock.save).toHaveBeenCalledTimes(2)
  })

  it('should NOT UPDATE product', async () => {
    try {
      const updatedProduct: UpdateProductDto = { name: '', price: 200 }
      const updated = await service.update(1, updatedProduct)
    } catch (error) {
      expect(productsRepositoryMock.findOneBy).toHaveBeenCalledTimes(2)
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    try {
      const updatedProduct: UpdateProductDto = { name: 'CS 500', price: 200 }
      const updated = await service.update(10, updatedProduct)
    } catch (error) {
      expect(productsRepositoryMock.findOneBy).toHaveBeenCalledTimes(3)
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
    expect(productsRepositoryMock.save).not.toHaveBeenCalledTimes(3)
  })

  it('should FIND ALL products', async () => {
    const found = await service.findAll()
    expect(productsRepositoryMock.find).toHaveBeenCalledWith()
  })

  it('should FIND ALL FILTERED products', async () => {
    const pagination = new PaginationDto()
    const productsFilter: ProductQueryDto = new ProductQueryDto()
    productsFilter.name = 'CS'
    const found = await service.findAll(productsFilter)
    expect(productsRepositoryMock.find).toHaveBeenCalledWith(
      {
        ...pagination,
        where: {
          name: ILike(`%${productsFilter.name}%`),
          price: MoreThanOrEqual(0)
        }
      }
    )
    productsFilter.price = 100
    const found2 = await service.findAll(productsFilter)
    expect(productsRepositoryMock.find).toHaveBeenCalledWith(
      {
        ...pagination,
        where: {
          name: ILike(`%${productsFilter.name}%`),
          price: MoreThanOrEqual(productsFilter.price)
        }
      }
    )
    productsFilter.price_filter  = 'lt'
    const found3 = await service.findAll(productsFilter)
    expect(productsRepositoryMock.find).toHaveBeenCalledWith(
      {
        ...pagination,
        where: {
          name: ILike(`%${productsFilter.name}%`),
          price: LessThanOrEqual(productsFilter.price)
        }
      }
    )

  })

  it('should FIND ONE product', async () => {
    const found = await service.findOne(1)
    expect(productsRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 1 })
  })

  it('should NOT FIND ONE product', async () => {
    let isError = false
    try {
      const found = await service.findOne(10)
    } catch (error) {
      isError = true
      expect(error).toBeInstanceOf(NotFoundException)
      expect(error.status).toBe(404)
    }
    expect(productsRepositoryMock.findOneBy).toHaveBeenCalledWith({ id: 10 })
    expect(isError).toBe(true)
  })

});
