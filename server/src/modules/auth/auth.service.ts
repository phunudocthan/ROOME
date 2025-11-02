import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
// Import your UserRole enum from your schema/model file
import { UserRole } from '../user/user.schema';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user by email and password.
   * This is called by the LocalStrategy.
   */
  async validateUser(email: string, password: string): Promise<any> {
    // The userService.findByEmail should select the password
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Password matches. Return the user object without the password.
      const result = user.toObject();
      delete result.password;
      return result;
    }
    return null; // Invalid credentials
  }

  /**
   * Generates a JWT for a validated user.
   * This is called by the AuthController after login.
   */
  async login(user: any) {
    // 'user' here is the clean object from validateUser
    const payload = { email: user.email, sub: user._id, role: user.role };

    return {
      user: {
        id: user._id,
        email: user.email,
        full_name: user.full_name, // <-- MODIFIED: Matches your schema
        role: user.role,
        phone_number: user.phone_number,
        avatar_url: user.avatar_url,
        is_active: user.is_active,
      },
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Registers a new user.
   * This is called by the AuthController.
   */
  async register(createUserDto: {
    email: string;
    password: string;
    full_name: string; // <-- MODIFIED: Changed from 'name'
    role: UserRole; // <-- MODIFIED: Added 'role'
  }) {
    // The create method in userService should handle hashing and saving
    const user = await this.userService.create(createUserDto);

    // After creating, we need to log them in.
    // We must manually create a clean object, as 'user' will have password.
    const cleanUser = {
      _id: user._id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      phone_number: user.phone_number,
      avatar_url: user.avatar_url,
      is_active: user.isActive,
    };

    // Return the user and a new token
    return this.login(cleanUser);
  }

  /**
   * Gets the full user profile.
   * This is called by the AuthController's /me route.
   */
  async getCurrentUser(userId: string) {
    // The findOne method in userService should not return the password
    return this.userService.findOne(userId);
  }
}
