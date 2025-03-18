import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVoterTagsDto as CreateDto } from './create.dto';

export class UpdateVoterTagsDto extends PartialType(CreateDto) {
  @ApiProperty({
    description: 'Update DTO for Voter Tags - all fields are optional',
    type: CreateDto,
    isArray: false,
    required: false
  })
  _documentation?: any;
}
