import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards, // <-- NEW
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // <-- NEW
import { RolesGuard } from '../auth/guards/roles.guard'; // <-- NEW
import { Roles } from '../auth/decorators/roles.decorator'; // <-- NEW
import { UserRole } from './user.schema'; // <-- NEW

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard) // <-- Protect all routes in this controller
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(UserRole.ADMIN) // <-- Only Admins can list all users
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN) // <-- Only Admins can get a user by ID
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN) // <-- Only Admins can update a user
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN) // <-- Only Admins can delete a user
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
