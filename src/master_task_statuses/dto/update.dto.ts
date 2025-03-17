import { PartialType } from '@nestjs/swagger';
import { CreateMasterTaskStatusDto as CreateDto } from './create.dto';

export class UpdateMasterTaskStatusDto extends PartialType(CreateDto) {}
