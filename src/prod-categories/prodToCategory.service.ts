import { PROD_CAT_REPOSITORY } from '@constants/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProdToCategory } from './entities/prod-category.entity';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProdToCategoryService {
  constructor(
    @Inject(PROD_CAT_REPOSITORY)
    private readonly respository: Repository<ProdToCategory>,
  ) {}

  async create(category: Category, product: Product): Promise<ProdToCategory> {
    const entity = this.respository.create({
      categoryId: category.id,
      productId: product.id,
    });

    return await this.respository.save(entity);
  }

  async findAll(offset: number, limit: number): Promise<object> {
    const [results, count] = await this.respository.findAndCount({
      where: { deletedAt: null },
      select: {
        id: true,
      },
      relations: ['category', 'product'],
      skip: offset,
      take: limit,
    });

    if (!results || count === 0) throw new NotFoundException();

    return { count, offset, limit, results };
  }

  async findAllByCategory(
    category: Category,
    offset: number,
    limit: number,
  ): Promise<object> {
    const [results, count] = await this.respository.findAndCount({
      where: { deletedAt: null, categoryId: category.id },
      select: {
        id: true,
      },
      relations: ['product'],
      skip: offset,
      take: limit,
    });

    if (!results || count === 0) throw new NotFoundException();

    return { count, offset, limit, results };
  }

  async findAllByProduct(
    product: Product,
    offset: number,
    limit: number,
  ): Promise<object> {
    const [results, count] = await this.respository.findAndCount({
      where: { deletedAt: null, productId: product.id },
      select: {
        id: true,
      },
      relations: ['category'],
      skip: offset,
      take: limit,
    });

    if (!results || count === 0) throw new NotFoundException();

    return { count, offset, limit, results };
  }

  async findOne(id: string): Promise<object> {
    const results = await this.respository.findOne({
      where: { deletedAt: null, id },
      select: {
        id: true,
      },
      relations: ['category', 'product'],
    });

    if (!results) throw new NotFoundException();

    return { results };
  }
}
