import { PartialType } from '@nestjs/swagger';
import { CreateMasterContactTypeDto as CreateDto } from './create.dto';

export class UpdateMasterContactTypeDto extends PartialType(CreateDto) {}
