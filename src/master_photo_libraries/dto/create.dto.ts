import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterPhotoLibraryDto
  implements Readonly<CreateMasterPhotoLibraryDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  file_extension: string;

  @ApiProperty()
  dimension: string;

  @ApiProperty()
  seo_tag: string;

  @ApiProperty()
  attachment: string;
}
