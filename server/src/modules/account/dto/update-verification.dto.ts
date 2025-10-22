import { IsString, IsEnum, IsOptional } from 'class-validator';

export class UpdateVerificationDto {
  @IsOptional()
  @IsString()
  id_card_front_url?: string;

  @IsOptional()
  @IsString()
  id_card_back_url?: string;

  @IsOptional()
  @IsEnum(['pending', 'verified', 'rejected'])
  status?: string;
}