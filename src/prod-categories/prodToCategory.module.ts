import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { ProdToCategoryService } from './prodToCategory.service';
import { prodToCategoryProviders } from './prodToCategory.provider';
import { ProdToCategoryController } from './prodToCategory.controller';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [DatabaseModule, ProductsModule, CategoriesModule],
  providers: [ProdToCategoryService, ...prodToCategoryProviders],
  controllers: [ProdToCategoryController],
})
export class ProdToCategoryModule {}
