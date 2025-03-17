import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterBookLibraryDto
  implements Readonly<CreateMasterBookLibraryDto>
{
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  published_date: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  digital_library: number;

  @ApiProperty()
  seo_tags: string;

  @ApiProperty()
  file_path: string;
}
