import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationUserRolesDto
  implements Readonly<CreateApplicationUserRolesDto>
{
  @ApiProperty()
  user: number;

  @ApiProperty()
  role: number;

  @ApiProperty()
  assigned_date: Date;
}
