import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterCountyDto implements Readonly<CreateMasterCountyDto> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  master_country: number;

  @ApiProperty()
  master_state: number;
}
