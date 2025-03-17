import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateApplicationUsersDto as CreateDto } from './create.dto';

export class UpdateApplicationUsersDto extends PartialType(CreateDto) {
  @ApiProperty()
  app_user_roles?: number[];
}
