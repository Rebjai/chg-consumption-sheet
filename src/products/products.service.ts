import { PaginationDto } from './../common/dto/pagination.dto';
import { BadRequestException, Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FindManyOptions, ILike, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import * as xlsx from 'xlsx'


/**
 * ProductsService is responsible for handling all the CRUD operations for products.
 */
@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) { }

  /**
   * Creates a new product with the provided details.
   * @param createProductDto DTO containing the details of the product to be created.
   * @returns The newly created product.
   * @throws BadRequestException if the DTO fails validation.
   */
  async create(createProductDto: CreateProductDto): Promise<Product> {
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

  /**
   * Finds all products based on the provided search parameters.
   * @param productQuery DTO containing the search parameters.
   * @param pagination DTO containing pagination parameters.
   * @returns A paginated list of products based on the search parameters.
   */
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
    return paginate<Product>(this.productsRepository, pagination, { order: { name: 'DESC', id: 'DESC' } })
  }

  /**
   * Finds a product with the provided ID.
   * @param id The ID of the product to find.
   * @returns The product with the provided ID.
   * @throws NotFoundException if the product with the provided ID is not found.
   */
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException();
    }
    return product
  }

  /**
   * Updates a product with the provided ID and new details.
   * @param id The ID of the product to update.
   * @param updateProductDto DTO containing the new details of the product.
   * @returns The updated product.
   * @throws NotFoundException if the product with the provided ID is not found.
   * @throws BadRequestException if the DTO fails validation.
   */
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
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

  /**
   * Deletes a product with the provided ID.
   * @param id The ID of the product to delete.
   * @returns The result of the delete operation.
   */

  async remove(id: number) {
    return this.productsRepository.softDelete({ id });
  }


  private getFindOptions(productQuery: ProductQueryDto): FindManyOptions<Product> {
    const options: FindManyOptions<Product> = { where: {}, order: { name: 'DESC', id: 'DESC' } };
    if (productQuery.name) {
      options.where = { name: ILike(`%${productQuery.name}%`) };
    }
    if (productQuery.price) {
      if (productQuery.price_filter == 'lt') {
        options.where = { ...options.where, price: LessThanOrEqual(productQuery.price) }
      } else {
        options.where = { ...options.where, price: MoreThanOrEqual(productQuery.price) }
      }
    }

    return options;
  }

  async downloadFile(productQuery?: ProductQueryDto, format: 'csv' | 'xlsx' = 'csv'): Promise<StreamableFile> {
    const options = this.getFindOptions(productQuery)
    const data = await this.productsRepository.find(options);
    if (format === 'csv') {
      return this.exportAsCsv(data);
    } else {
      return this.exportAsExcel(data);
    }
  }

  private async exportAsCsv(data: Product[]): Promise<StreamableFile> {
    const exportData = data.map(({ id, name, price, category }) => ({ id, name, price, category: category?.code ?? 'n/a' }))
    const worksheet = xlsx.utils.json_to_sheet(exportData)
    const workbook = xlsx.utils.book_new();
    const stream = xlsx.stream.to_csv(worksheet);
    const filename = 'my-csv-file.csv';
    const streamableFile = new StreamableFile(stream);
    return streamableFile
  }

  private async exportAsExcel(data: Product[]): Promise<StreamableFile> {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');
    const stream = xlsx.writeXLSX(workbook, { bookType: 'xlsx', bookSST: false });

    // create the StreamableFile object with appropriate headers
    const filename = 'my-excel-file.xlsx';
    const streamableFile = new StreamableFile(stream);

    // return the StreamableFile object
    return streamableFile;
  }
}
