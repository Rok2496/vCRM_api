import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationRolesDto
  implements Readonly<CreateApplicationRolesDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
