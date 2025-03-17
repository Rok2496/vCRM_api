import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterConnectChannelDto
  implements Readonly<CreateMasterConnectChannelDto>
{
  @ApiProperty()
  name: string;
}
