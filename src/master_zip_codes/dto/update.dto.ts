import { PartialType } from '@nestjs/swagger';
import { CreateMasterZipCodeDto as CreateDto } from './create.dto';

export class UpdateMasterZipCodeDto extends PartialType(CreateDto) {}
