import { PartialType } from '@nestjs/swagger';
import { CreateApplicationUserCustomPermissionsDto as CreateDto } from './create.dto';

export class UpdateApplicationUserCustomPermissionsDto extends PartialType(
  CreateDto,
) {}
