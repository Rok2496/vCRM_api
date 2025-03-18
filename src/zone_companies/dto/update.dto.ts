import { PartialType } from '@nestjs/swagger';
import { CreateZoneCompaniesDto } from './create.dto';

export class UpdateZoneCompaniesDto extends PartialType(CreateZoneCompaniesDto) {} 