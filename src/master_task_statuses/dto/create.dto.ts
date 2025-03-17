import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterTaskStatusDto
  implements Readonly<CreateMasterTaskStatusDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  color_code: string;

  @ApiProperty()
  sequence: number;
}
