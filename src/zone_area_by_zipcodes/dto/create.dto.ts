import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateZoneAreaByZipcodesDto {
  @ApiProperty({
    description: 'The ID of the zone to associate with this zipcode area',
    example: 1,
    required: true,
  })
  @IsNumber()
  zone_id: number;

  @ApiProperty({
    description: 'The city name for this zone zipcode area',
    example: 'Austin',
    required: false,
  })
  @IsString()
  @IsOptional()
  city_name?: string;

  @ApiProperty({
    description: 'The ZIP code for this zone area',
    example: '78701',
    required: false,
  })
  @IsString()
  @IsOptional()
  zip_code?: string;

  @ApiProperty({
    description: 'The ZIP code ID reference from master zip codes',
    example: 123,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  zip_code_id?: number;
} 