import { PartialType } from '@nestjs/swagger';
import { CreateZoneContactsDto } from './create.dto';

export class UpdateZoneContactsDto extends PartialType(CreateZoneContactsDto) {} 