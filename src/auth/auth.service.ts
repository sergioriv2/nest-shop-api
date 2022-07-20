/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto as UserDto } from '@users/dto/create-user.dto';

import * as bcrypt from 'bcryptjs';
import { RolesService } from '@roles/roles.service';
import { UsersService } from '@users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<any> {
    // Find user by email
    const user = await this.userService.findOneByEmail(email);

    // User not found
    if (!user) return null;

    // Check password
    const resultCompare = await this.comparePassword(pass, user.password);

    // Password doesn't match
    if (!resultCompare) return null;

    const { password, ...result } = user;

    return result;
  }

  async login(user: UserDto) {
    const { description } = await this.roleService.findOne(user.roleId);

    const payload = { id: user.id, email: user.email, role: description };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async signup(user: UserDto): Promise<any> {
    // Hash password
    const pass = user.password;
    const hashPass = await bcrypt.hash(pass, parseInt(process.env.HASH_ROUNDS));

    const userRole = await this.roleService.findOneByDescription('USER');

    // Create new user
    const newUser = await this.userService.create(
      {
        ...user,
        password: hashPass,
      },
      userRole,
    );

    const { password, ...data } = newUser;

    // Generate JWT from the user
    const token = await this.jwtService.signAsync(data);

    return { user: data, token };
  }

  private async comparePassword(
    password: string,
    dbPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, dbPassword);
  }
}
