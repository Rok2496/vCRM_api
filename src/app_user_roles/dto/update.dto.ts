import { PartialType } from '@nestjs/swagger';
import { CreateApplicationUserRolesDto as CreateDto } from './create.dto';

export class UpdateApplicationUserRolesDto extends PartialType(CreateDto) {}
