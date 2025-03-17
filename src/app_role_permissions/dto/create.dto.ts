import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationRolePermissionsDto
  implements Readonly<CreateApplicationRolePermissionsDto>
{
  @ApiProperty()
  role: number;

  @ApiProperty()
  permission: number;
}
