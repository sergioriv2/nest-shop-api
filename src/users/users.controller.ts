import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';

// Guards
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from '../guards/AdminGuards.guards';
import { UserGuard } from '../guards/UserGuards.guards';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const role = await this.rolesService.findOne(createUserDto.roleId);

  //   const results = await this.usersService.create(createUserDto, role);

  //   return { results };
  // }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findAll(@Query('offset') offset = 0, @Query('limit') limit = 10) {
    return await this.usersService.findAll(Number(offset), Number(limit));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async findOne(@Param('id') id: string) {
    const results = await this.usersService.findOne(id);
    return { results };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async findLocalUser(@Request() req) {
    const results = await this.usersService.findOne(req.user.id);
    return { results };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const results = this.usersService.update(id, updateUserDto);
    return { results };
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async updateLocalUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const results = this.usersService.update(req.user.id, updateUserDto);
    return { results };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  async remove(@Param('id') id: string) {
    const results = this.usersService.remove(id);
    return { results };
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), UserGuard)
  async removeLocalUser(@Request() req) {
    const results = this.usersService.remove(req.user.id);
    return { results };
  }
}
