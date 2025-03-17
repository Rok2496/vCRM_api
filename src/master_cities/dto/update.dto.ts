import { PartialType } from '@nestjs/swagger';
import { CreateMasterCityDto as CreateDto } from './create.dto';

export class UpdateMasterCityDto extends PartialType(CreateDto) {}
