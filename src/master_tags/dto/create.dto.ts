import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterTagDto implements Readonly<CreateMasterTagDto> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  synonyms: string;

  @ApiProperty()
  display_sequence: number;

  @ApiProperty()
  image: string;

  @ApiProperty()
  master_tag_category: number;
}
