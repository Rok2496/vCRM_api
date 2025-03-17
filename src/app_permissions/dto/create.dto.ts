import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationPermissionsDto
  implements Readonly<CreateApplicationPermissionsDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
