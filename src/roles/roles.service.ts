import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

import { ROLE_REPOSITORY } from '@constants/constants';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly repository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existsRole = await this.repository.findOne({
      where: { description: createRoleDto.description },
    });

    if (existsRole)
      throw new BadRequestException(
        'A role with this description already exists',
      );

    const role = this.repository.create({
      ...createRoleDto,
    });
    const result = await this.repository.save(role);

    return result;
  }

  async findAll(offset: number, limit: number): Promise<object> {
    const [results, count] = await this.repository.findAndCount({
      withDeleted: false,
      select: {
        id: true,
        description: true,
      },
      skip: offset,
      take: limit,
    });

    if (!results || count == 0) throw new NotFoundException(`Roles  not found`);

    return { count, offset, limit, results };
  }

  async findOne(id: string): Promise<Role> {
    const results = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!results) throw new NotFoundException(`Role with ID ${id} not found`);

    return results;
  }

  async findOneByDescription(description: string): Promise<Role> {
    const results = await this.repository.findOne({
      where: { deletedAt: null, description },
    });

    if (!results)
      throw new NotFoundException(
        `Role with description ${description} not found`,
      );

    return results;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const results = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!results) throw new NotFoundException(`Role with ID ${id} not found`);

    return await this.repository.save({
      ...results,
      ...updateRoleDto,
    });
  }

  async remove(id: string): Promise<object> {
    const role = await this.repository.findOne({
      where: { deletedAt: null, id },
    });

    if (!role) throw new NotFoundException(`Role with ID ${id} not found`);

    await this.repository.softDelete({
      id: role.id,
    });

    return { ok: true, msg: 'Role deleted successfully' };
  }
}
