import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationNotificationsDto
  implements Readonly<CreateApplicationNotificationsDto>
{
  @ApiProperty()
  user: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  is_read: boolean;
}
