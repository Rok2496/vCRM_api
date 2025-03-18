import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateZoneCompaniesDto {
  @ApiProperty({
    description: 'The ID of the zone to associate with this company',
    example: 1,
    required: true,
  })
  @IsNumber()
  zone_id: number;

  @ApiProperty({
    description: 'The ID of the company to associate with this zone',
    example: 1,
    required: true,
  })
  @IsNumber()
  company_id: number;

  @ApiProperty({
    description: 'The city name for this zone company association',
    example: 'Austin',
    required: false,
  })
  @IsString()
  @IsOptional()
  city_name?: string;

  @ApiProperty({
    description: 'The ZIP code for this zone company association',
    example: '78701',
    required: false,
  })
  @IsString()
  @IsOptional()
  zip_code?: string;

  @ApiProperty({
    description: 'The display score for this zone company association',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  display_score?: number;
} 