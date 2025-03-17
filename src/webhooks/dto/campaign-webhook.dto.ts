import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CampaignWebhookDto {
  @ApiProperty({ description: 'Name of the campaign' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the campaign' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Start date of the campaign' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'End date of the campaign' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Status of the campaign' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: 'Whether the campaign is active' })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'Tags associated with the campaign',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiProperty({
    description: 'Additional details for the campaign',
    required: false,
  })
  @IsOptional()
  details?: Record<string, any>;
}
