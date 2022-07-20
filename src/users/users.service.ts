import { USER_REPOSITORY } from '../../src/constants/constants';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, role: Role) {
    const existsUser = await this.repository.findOne({
      where: { email: createUserDto.email },
    });

    if (existsUser)
      throw new BadRequestException(
        'An user is already registered with this email',
      );

    const user = await this.repository.create({
      roleId: role.id,
      ...createUserDto,
    });

    return await this.repository.save(user);
  }

  async findAll(offset: number, limit: number): Promise<object> {
    const [results, count] = await this.repository.findAndCount({
      skip: offset,
      take: limit,
      select: ['id', 'email', 'createdAt', 'username'],
      where: { deletedAt: null },
    });

    if (!results || count === 0) throw new NotFoundException('Users not found');

    return { offset, limit, count, results };
  }

  async findOne(id: string): Promise<User> {
    const results = await this.repository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'email', 'createdAt', 'username'],
    });

    if (!results) throw new NotFoundException(`User with ID ${id} not found`);

    return results;
  }

  async findOneByEmail(email: string): Promise<User> {
    const results = await this.repository.findOne({
      where: { email, deletedAt: null },
    });

    if (!results)
      throw new NotFoundException(`User with email ${email} not found`);

    return results;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.repository.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    const result = await this.repository.save({
      ...user,
      ...updateUserDto,
    });

    return result;
  }

  async remove(id: string): Promise<object> {
    const user = await this.repository.findOne({
      where: { id, deletedAt: null },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);

    await this.repository.softDelete({
      id: user.id,
    });

    return { ok: true, msg: 'User deleted successfully' };
  }
}
