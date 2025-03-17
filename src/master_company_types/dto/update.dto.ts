import { PartialType } from '@nestjs/swagger';
import { CreateMasterCompanyTypeDto as CreateDto } from './create.dto';

export class UpdateMasterCompanyTypeDto extends PartialType(CreateDto) {}
