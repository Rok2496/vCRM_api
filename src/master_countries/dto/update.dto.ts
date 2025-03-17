import { PartialType } from '@nestjs/swagger';
import { CreateMasterCountryDto as CreateDto } from './create.dto';

export class UpdateMasterCountryDto extends PartialType(CreateDto) {}
