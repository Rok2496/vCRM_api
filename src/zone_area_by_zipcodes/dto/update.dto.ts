import { PartialType } from '@nestjs/swagger';
import { CreateZoneAreaByZipcodesDto } from './create.dto';

export class UpdateZoneAreaByZipcodesDto extends PartialType(CreateZoneAreaByZipcodesDto) {} 