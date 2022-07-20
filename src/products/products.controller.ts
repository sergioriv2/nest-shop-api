import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';

// Guards
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/AdminGuards.guards';

// DTOs
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// Services
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const results = await this.productsService.create(createProductDto);
    return { results };
  }

  @Get()
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    const results = await this.productsService.findAll(
      Number(offset),
      Number(limit),
    );
    return results;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const results = await this.productsService.findOne(id);
    return { results };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const results = await this.productsService.update(id, updateProductDto);
    return { results };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const results = await this.productsService.remove(id);
    return { results };
  }
}
