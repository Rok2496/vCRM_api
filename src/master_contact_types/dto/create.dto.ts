import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterContactTypeDto
  implements Readonly<CreateMasterContactTypeDto>
{
  @ApiProperty()
  name: string;
}
