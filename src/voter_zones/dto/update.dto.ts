import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVoterZonesDto as CreateDto } from './create.dto';

export class UpdateVoterZonesDto extends PartialType(CreateDto) {
  @ApiProperty({
    description: 'Update DTO for Voter Zones - all fields are optional',
    type: CreateDto,
    isArray: false,
    required: false
  })
  _documentation?: any;
}
