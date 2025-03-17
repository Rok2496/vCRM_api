import { PartialType } from '@nestjs/swagger';
import { CreateApplicationPermissionsDto as CreateDto } from './create.dto';

export class UpdateApplicationPermissionsDto extends PartialType(CreateDto) {}
