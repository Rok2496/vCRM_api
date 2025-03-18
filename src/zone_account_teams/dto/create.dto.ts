import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateZoneAccountTeamsDto {
  @ApiProperty({
    description: 'The name of the zone account team',
    example: 'Northeast Regional Team',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Whether this team member is the primary manager for the zone',
    example: true,
    required: true,
  })
  @IsBoolean()
  primary_manager: boolean;

  @ApiProperty({
    description: 'The start date for this team member in the zone',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  start_date?: Date;

  @ApiProperty({
    description: 'The end date for this team member in the zone',
    example: '2023-12-31T00:00:00.000Z',
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_date?: Date;

  @ApiProperty({
    description: 'Whether this team member is active (live) or in planning',
    example: true,
    required: true,
  })
  @IsBoolean()
  live_or_planning: boolean;

  @ApiProperty({
    description: 'The ID of the zone this team member is associated with',
    example: 1,
    required: true,
  })
  @IsNumber()
  zone_id: number;

  @ApiProperty({
    description: 'The ID of the user (if applicable)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    description: 'The ID of the employee (if applicable)',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employee_id?: number;
} 