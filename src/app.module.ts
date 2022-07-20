import { Module } from '@nestjs/common';

import { CategoriesModule } from '@categories/categories.module';
import { DatabaseModule } from '@database/database.module';
import { ProductsModule } from '@products/products.module';
import { ProdToCategoryModule } from '@prod-categories/prodToCategory.module';
import { RolesModule } from '@roles/roles.module';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    RolesModule,
    ProdToCategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
