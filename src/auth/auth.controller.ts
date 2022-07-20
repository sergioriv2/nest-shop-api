import { Controller, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto as UserDto } from '@users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    const results = await this.authService.login(req.user);

    return { results };
  }

  @Post('signup')
  async signup(@Body() user: UserDto) {
    const results = await this.authService.signup(user);
    return { results };
  }
}
