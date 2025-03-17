import { PartialType } from '@nestjs/swagger';
import { CreateMasterAudioLibraryDto } from './create.dto';

export class UpdateMasterAudioLibraryDto extends PartialType(
  CreateMasterAudioLibraryDto,
) {}
