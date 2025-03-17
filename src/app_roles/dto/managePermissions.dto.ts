import { ApiProperty } from '@nestjs/swagger';

export class ManagePermissionsDto implements Readonly<ManagePermissionsDto> {
  @ApiProperty()
  permissions: string[];
}
