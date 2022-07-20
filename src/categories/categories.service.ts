import { CATEGORY_REPOSITORY } from '@constants/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { skip } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly repository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<object> {
    const category = await this.repository.create({ ...createCategoryDto });

    await this.repository.save(category);

    return { results: category };
  }

  async findAll(offset: number, limit: number): Promise<object> {
    const [results, count] = await this.repository.findAndCount({
      where: { deletedAt: null },
      skip: offset,
      take: limit,
    });

    if (!results || count === 0) throw new NotFoundException();

    return { count, offset, limit, results };
  }

  async findOne(id: string): Promise<Category> {
    const results = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!results) throw new NotFoundException();

    return results;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<object> {
    const category = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!category) throw new NotFoundException();

    const results = await this.repository.save({
      ...category,
      ...updateCategoryDto,
    });

    return { results };
  }

  async remove(id: string): Promise<object> {
    const category = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!category) throw new NotFoundException();

    await this.repository.save({
      id: category.id,
    });

    return { ok: true, msg: 'Category deleted successfully' };
  }
}
