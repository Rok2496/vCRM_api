import { PartialType } from '@nestjs/swagger';
import { CreateZoneDto as CreateDto } from './create.dto';

export class UpdateZoneDto extends PartialType(CreateDto) {}
