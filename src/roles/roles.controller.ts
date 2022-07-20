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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

// Guards
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/AdminGuards.guards';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const results = await this.rolesService.create(createRoleDto);

    return { results };
  }

  @Get()
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    const results = await this.rolesService.findAll(
      Number(offset),
      Number(limit),
    );

    return results;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const results = await this.rolesService.findOne(id);

    return { results };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const results = await this.rolesService.update(id, updateRoleDto);
    return { results };
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const results = await this.rolesService.remove(id);

    return { results };
  }
}
