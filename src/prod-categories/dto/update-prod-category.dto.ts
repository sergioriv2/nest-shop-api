import { PartialType } from '@nestjs/mapped-types';
import { CreateProdCategoryDto } from './create-prod-category.dto';

export class UpdateProdCategoryDto extends PartialType(CreateProdCategoryDto) {}
