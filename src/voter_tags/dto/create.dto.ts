import { ApiProperty } from '@nestjs/swagger';

export class CreateVoterTagsDto implements Readonly<CreateVoterTagsDto> {
  @ApiProperty({
    required: false,
    description: 'The title of the voter tag',
    example: 'Potential Supporter'
  })
  title?: string;

  @ApiProperty({
    required: false,
    description: 'Detailed description of what this tag represents',
    example: 'Voters who have expressed interest in supporting the campaign'
  })
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Sequence number for displaying tags in a specific order',
    example: 1
  })
  display_sequence?: number;

  @ApiProperty({
    required: false,
    description: 'Numerical score or weight associated with this tag (for scoring/ranking)',
    example: 5
  })
  score?: number;

  // Relations:
  @ApiProperty({
    required: false,
    description: 'ID of the voter associated with this tag',
    example: 1
  })
  voter?: number;

  @ApiProperty({
    required: false,
    description: 'ID of the master tag category this tag belongs to',
    example: 1
  })
  master_tag_category?: number;

  @ApiProperty({
    required: false,
    description: 'ID of the master tag this voter tag is based on',
    example: 1
  })
  master_tag?: number;
}
