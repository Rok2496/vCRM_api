import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationUserCustomPermissionsDto
  implements Readonly<CreateApplicationUserCustomPermissionsDto>
{
  @ApiProperty()
  user: number;

  @ApiProperty()
  permission: number;

  @ApiProperty()
  access_level: string;

  @ApiProperty()
  assigned_date: Date;
}
