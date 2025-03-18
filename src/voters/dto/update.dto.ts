import { PartialType } from '@nestjs/swagger';
import { CreateVotersDto as CreateDto } from './create.dto';

export class UpdateVotersDto extends PartialType(CreateDto) {}
