import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateZoneContactsDto {
  @ApiProperty({
    description: 'The ID of the zone to associate with this contact',
    example: 1,
    required: true,
  })
  @IsNumber()
  zone_id: number;

  @ApiProperty({
    description: 'The ID of the contact to associate with this zone',
    example: 1,
    required: true,
  })
  @IsNumber()
  contact_id: number;

  @ApiProperty({
    description: 'The display score for this zone contact association',
    example: 100,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  display_score?: number;

  @ApiProperty({
    description: 'The ID of the data repository associated with this record',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  data_repo_id?: number;
} 