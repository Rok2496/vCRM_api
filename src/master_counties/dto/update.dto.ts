import { PartialType } from '@nestjs/swagger';
import { CreateMasterCountyDto as CreateDto } from './create.dto';

export class UpdateMasterCountyDto extends PartialType(CreateDto) {}
