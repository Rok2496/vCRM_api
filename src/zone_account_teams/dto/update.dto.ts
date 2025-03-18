import { PartialType } from '@nestjs/swagger';
import { CreateZoneAccountTeamsDto } from './create.dto';

export class UpdateZoneAccountTeamsDto extends PartialType(CreateZoneAccountTeamsDto) {} 