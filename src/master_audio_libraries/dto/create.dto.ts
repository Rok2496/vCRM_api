import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterAudioLibraryDto
  implements Readonly<CreateMasterAudioLibraryDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  audio_link: string;

  @ApiProperty()
  size: string;

  @ApiProperty()
  file_extension: string;

  @ApiProperty()
  seo_tag: string;

  @ApiProperty()
  attachment: string;
}
