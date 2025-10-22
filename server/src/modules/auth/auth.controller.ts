import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      name: string;
      role?: any;
    },
  ) {
    const payload = {
      email: createUserDto.email,
      password: createUserDto.password,
      full_name: createUserDto.name,
      // default to a basic role when none provided; cast to any to satisfy the service's UserRole type
      role: (createUserDto as any).role ?? ('user' as any),
    };

    return this.authService.register(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getCurrentUser(@Request() req) {
    return this.authService.getCurrentUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}
