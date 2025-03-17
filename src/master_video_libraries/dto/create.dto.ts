import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterVideoLibraryDto
  implements Readonly<CreateMasterVideoLibraryDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  video_link: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  file_extension: string;

  @ApiProperty()
  seo_tag: string;

  @ApiProperty()
  attachment: string;
}
