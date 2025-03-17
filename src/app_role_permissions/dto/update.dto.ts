import { PartialType } from '@nestjs/swagger';
import { CreateApplicationRolePermissionsDto as CreateDto } from './create.dto';

export class UpdateApplicationRolePermissionsDto extends PartialType(
  CreateDto,
) {}
