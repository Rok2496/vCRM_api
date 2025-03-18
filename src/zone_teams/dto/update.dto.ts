import { PartialType } from '@nestjs/swagger';
import { CreateZoneTeamsDto } from './create.dto';

export class UpdateZoneTeamsDto extends PartialType(CreateZoneTeamsDto) {} 