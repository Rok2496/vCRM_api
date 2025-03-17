import { PartialType } from '@nestjs/swagger';
import { CreateMasterZoneTypeDto as CreateDto } from './create.dto';

export class UpdateMasterZoneTypeDto extends PartialType(CreateDto) {}
