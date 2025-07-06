import { Test, TestingModule } from '@nestjs/testing';
import { ProductSatCategoryService } from './product-sat-category.service';

describe('ProductSatCategoryService', () => {
  let service: ProductSatCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductSatCategoryService,
        {
          provide: 'ProductSatCategoryRepository',
          useValue: {},  // Mock or real repository can be used here
        },
      ],
    }).compile();

    service = module.get<ProductSatCategoryService>(ProductSatCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
