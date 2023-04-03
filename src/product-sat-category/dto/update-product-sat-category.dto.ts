import { PartialType } from '@nestjs/swagger';
import { CreateProductSatCategoryDto } from './create-product-sat-category.dto';

export class UpdateProductSatCategoryDto extends PartialType(CreateProductSatCategoryDto) {}
