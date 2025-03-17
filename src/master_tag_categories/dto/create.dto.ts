import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterTagCategoryDto
  implements Readonly<CreateMasterTagCategoryDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  display_sequence: number;

  @ApiProperty()
  public_or_private: boolean;
}
