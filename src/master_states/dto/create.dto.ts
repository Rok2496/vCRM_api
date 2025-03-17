import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterStateDto implements Readonly<CreateMasterStateDto> {
  @ApiProperty()
  name: string;

  @ApiProperty()
  ticker: string;

  @ApiProperty()
  master_country: number;
}
