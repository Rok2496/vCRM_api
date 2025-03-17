import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterZipCodeDto
  implements Readonly<CreateMasterZipCodeDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  master_country: number;

  @ApiProperty()
  master_state: number;

  @ApiProperty()
  master_county: number;
}
