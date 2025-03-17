import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterCountryDto
  implements Readonly<CreateMasterCountryDto>
{
  @ApiProperty()
  name: string;

  @ApiProperty()
  ticker: string;

  @ApiProperty()
  flag_icon: string;

  @ApiProperty()
  phone_code: string;
}
