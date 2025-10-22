import { IsEmail, IsEnum, IsString, IsOptional, MinLength, IsBoolean } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['tenant', 'landlord', 'admin'])
  role: string;

  @IsString()
  full_name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}