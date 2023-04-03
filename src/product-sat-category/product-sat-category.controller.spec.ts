import { Test, TestingModule } from '@nestjs/testing';
import { ProductSatCategoryController } from './product-sat-category.controller';
import { ProductSatCategoryService } from './product-sat-category.service';

describe('ProductSatCategoryController', () => {
  let controller: ProductSatCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductSatCategoryController],
      providers: [ProductSatCategoryService],
    }).compile();

    controller = module.get<ProductSatCategoryController>(ProductSatCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
