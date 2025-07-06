import "reflect-metadata";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { ILike, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { ProductQueryDto } from './dto/product-query.dto';
import { PaginationDto } from "src/common/dto/pagination.dto";

import { paginate } from "nestjs-typeorm-paginate";

jest.mock('nestjs-typeorm-paginate');

describe('ProductsService', () => {
  let service: ProductsService;
  const products: Product[] = [
    { id: 1, name: 'CS 500', price: 100, created_at: new Date(), updated_at: new Date() },
    { id: 2, name: 'CS 1000', price: 150, created_at: new Date(), updated_at: new Date() },
  ]
  const productsRepositoryMock = {
    save: jest.fn().mockImplementation((x: Product) => x),
    findOneBy: jest.fn().mockImplementation(({ id }) => products.find(val => val.id == id) as Product),
    find: jest.fn().mockImplementation((options) => products)
  }
  const paginatedResult = {
    items: [],
    meta: {
      itemCount: 0,
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService,
        { provide: getRepositoryToken(Product), useValue: productsRepositoryMock }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    (paginate as jest.Mock).mockResolvedValue(paginatedResult);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should CREATE a product', async () => {
    const newProduct: CreateProductDto = { name: 'CS 500', price: 100, category_id: 1 }
    const created = await service.create(newProduct)
    expect(created).toBeInstanceOf(Product)
    expect(productsRepositoryMock.save).toHaveBeenCalledTimes(1)
  })

  it('should NOT CREATE a product', async () => {
    try {
      const newProduct: CreateProductDto = { name: '', price: 100, category_id: 1 }
      const created = await service.create(newProduct)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException)
      expect(error.status).toBe(400)
    }
    try {
      const newProduct: CreateProductDto = { name: 'CS 500', price: null, category_id: 1 }
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
    expect(paginate).toHaveBeenCalledWith(productsRepositoryMock, new PaginationDto(), { order: { name: 'DESC', id: 'DESC' } })

  })

  it('should FIND ALL FILTERED products', async () => {
    const pagination = new PaginationDto();
    const productsFilter = new ProductQueryDto();
    productsFilter.name = 'CS';

    const mockResult = { items: [], meta: {} };
    (paginate as jest.Mock).mockResolvedValue(mockResult);

    // First test: name filter only
    await service.findAll(productsFilter, pagination);

    expect(paginate).toHaveBeenNthCalledWith(1,
      productsRepositoryMock,
      pagination,
      {order: {
          name: 'DESC',
          id: 'DESC',
        }}
    );
    // Second test: name + price
    productsFilter.price = 100;
    await service.findAll(productsFilter, pagination);

    expect(paginate).toHaveBeenNthCalledWith(2,
      productsRepositoryMock,
      pagination,
      expect.objectContaining({
        where: expect.objectContaining({
          name: expect.any(Object),
          price: expect.any(Object),
        }),
      }),
    );

    // Third test: price_filter = 'lt'
    productsFilter.price_filter = 'lt';
    await service.findAll(productsFilter, pagination);

    const thirdCall = (paginate as jest.Mock).mock.calls[2][2];

    expect(thirdCall.where.name._value).toBe('%CS%');
    expect(thirdCall.where.price._type).toBe('moreThanOrEqual');
    expect(thirdCall.where.price._value).toBe(100);
  });


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
