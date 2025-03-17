import { PartialType } from '@nestjs/swagger';
import { CreateMasterConnectChannelDto as CreateDto } from './create.dto';

export class UpdateMasterConnectChannelDto extends PartialType(CreateDto) {}
