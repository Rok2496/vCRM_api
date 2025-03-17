import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterZoneTypeDto
  implements Readonly<CreateMasterZoneTypeDto>
{
  @ApiProperty()
  name: string;
}
