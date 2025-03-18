import { ApiProperty } from '@nestjs/swagger';

export class CreateZoneDto implements Readonly<CreateZoneDto> {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  estimated_population?: number;

  @ApiProperty()
  has_parent_zone: boolean;

  @ApiProperty({ required: false })
  parent_zone?: number;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longitude?: number;

  @ApiProperty()
  live_or_planning: boolean;

  @ApiProperty()
  custom_url?: string;

  @ApiProperty({ required: false })
  office_address?: string;

  @ApiProperty({ required: false })
  elected_official_name?: string;

  @ApiProperty({ required: false })
  elected_official_title?: string;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  website?: string;

  @ApiProperty({ required: false })
  projected_yearly_revenue?: number;

  @ApiProperty({ required: false })
  sequence?: number;

  @ApiProperty({ required: false })
  population_stats?: number;

  @ApiProperty({ required: false })
  contact_stats?: number;

  @ApiProperty({ required: false })
  business_stats?: number;

  @ApiProperty({ required: false })
  democrates_voter_stats?: number;

  @ApiProperty({ required: false })
  republican_voter_stats?: number;

  @ApiProperty({ required: false })
  independent_voter_stats?: number;

  @ApiProperty({ required: false })
  active_voter_stats?: number;

  @ApiProperty({ required: false })
  zone_image?: string;

  @ApiProperty({ required: false })
  country?: number;

  @ApiProperty({ required: false })
  state?: number;

  @ApiProperty({ required: false })
  county?: number;

  @ApiProperty({ required: false })
  zone_type?: number;

  @ApiProperty({ required: false })
  manager_employee?: number;
}
