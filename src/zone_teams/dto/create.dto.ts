import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateZoneTeamsDto {
  @ApiProperty({
    description: 'The name of the zone team',
    example: 'Campaign Team Alpha',
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
    description: 'The date when the team member started',
    example: '2023-01-01T00:00:00.000Z',
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  start_date?: Date;

  @ApiProperty({
    description: 'The date when the team member ended their role',
    example: '2023-12-31T00:00:00.000Z',
    required: false,
    type: Date,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  end_date?: Date;

  @ApiProperty({
    description: 'Whether the team member is active or former',
    example: true,
    required: true,
  })
  @IsBoolean()
  Active_or_former: boolean;

  @ApiProperty({
    description: 'The ID of the zone this team is associated with',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  zone_id?: number;

  @ApiProperty({
    description: 'The ID of the user assigned to this team',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  user_id?: number;

  @ApiProperty({
    description: 'The ID of the employee assigned to this team',
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  employee_id?: number;
} 