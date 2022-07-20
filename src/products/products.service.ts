import { PRODUCT_REPOSITORY } from '@constants/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.repository.findOne({
      where: { description: createProductDto.description },
    });

    if (existingProduct) throw new BadRequestException();

    const product = this.repository.create({
      ...createProductDto,
    });

    return await this.repository.save(product);
  }

  async findAll(offset: number, limit: number): Promise<object> {
    const [results, count] = await this.repository.findAndCount({
      where: { deletedAt: null },
      select: ['id', 'description', 'image', 'createdAt', 'updatedAt'],
      skip: offset,
      take: limit,
    });

    if (!results || count === 0) throw new NotFoundException();

    return { count, offset, limit, results };
  }

  async findOne(id: string): Promise<Product> {
    const results = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!results) throw new NotFoundException();

    return results;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<object> {
    const product = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!product) throw new NotFoundException();

    const results = await this.repository.save({
      ...product,
      ...updateProductDto,
    });

    return { results };
  }

  async remove(id: string): Promise<object> {
    const product = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!product) throw new NotFoundException();

    await this.repository.softDelete({
      id: product.id,
    });

    return { ok: true, msg: 'Product deleted successfully' };
  }
}
