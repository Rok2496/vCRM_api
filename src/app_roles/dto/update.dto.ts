import { PartialType } from '@nestjs/swagger';
import { CreateApplicationRolesDto as CreateDto } from './create.dto';

export class UpdateApplicationRolesDto extends PartialType(CreateDto) {}
