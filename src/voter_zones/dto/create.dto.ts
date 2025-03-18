import { ApiProperty } from '@nestjs/swagger';

export class CreateVoterZonesDto implements Readonly<CreateVoterZonesDto> {
  @ApiProperty({
    required: false,
    description: 'Sequence number for displaying voter zones in a specific order',
    example: 1
  })
  display_sequence?: number;

  // Relations:
  @ApiProperty({
    required: true,
    description: 'ID of the zone this voter zone association belongs to',
    example: 1
  })
  zone: number;

  @ApiProperty({
    required: true,
    description: 'ID of the voter associated with this zone',
    example: 1
  })
  voter: number;

  @ApiProperty({
    required: true,
    description: 'ID of the data repository containing this voter-zone relationship',
    example: 1
  })
  data_repo: number;
}
