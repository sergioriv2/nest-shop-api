import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { ProdToCategoryService } from './prodToCategory.service';
import { CreateProdCategoryDto } from './dto/create-prod-category.dto';

// Guards
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/AdminGuards.guards';

@Controller('prod-category')
export class ProdToCategoryController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly prodToCatService: ProdToCategoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async create(@Body() createProdCat: CreateProdCategoryDto) {
    const category = await this.categoriesService.findOne(
      createProdCat.category,
    );
    const product = await this.productsService.findOne(createProdCat.product);

    const results = await this.prodToCatService.create(category, product);

    return { results };
  }

  @Get()
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    const results = await this.prodToCatService.findAll(
      Number(offset),
      Number(limit),
    );

    return results;
  }

  @Get('category/:categoryId')
  async findAllByCategory(
    @Param('categoryId') categoryId: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ) {
    const category = await this.categoriesService.findOne(categoryId);

    const results = await this.prodToCatService.findAllByCategory(
      category,
      Number(offset),
      Number(limit),
    );

    return results;
  }

  @Get('product/:productId')
  async findAllByProduct(
    @Param('productId') productId: string,
    @Query('offset') offset = 0,
    @Query('limit') limit = 10,
  ) {
    const product = await this.productsService.findOne(productId);

    const results = await this.prodToCatService.findAllByProduct(
      product,
      Number(offset),
      Number(limit),
    );

    return results;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const results = await this.prodToCatService.findOne(id);

    return results;
  }
}
