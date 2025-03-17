import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterCompanyTypeDto
  implements Readonly<CreateMasterCompanyTypeDto>
{
  @ApiProperty()
  name: string;
}
