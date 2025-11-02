import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../user/user.schema';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get the roles required for this route (from the @Roles decorator)
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // 2. If the endpoint has no @Roles decorator, allow access
    if (!requiredRoles) {
      return true;
    }

    // 3. Get the user object from the request
    // (This was attached by the JwtAuthGuard, which runs first)
    const { user } = context.switchToHttp().getRequest();

    // 4. Check if the user's role is in the list of required roles
    return requiredRoles.includes(user.role);
  }
}
