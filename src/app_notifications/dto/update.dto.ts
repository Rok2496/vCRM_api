import { PartialType } from '@nestjs/swagger';
import { CreateApplicationNotificationsDto as CreateDto } from './create.dto';

export class UpdateApplicationNotificationsDto extends PartialType(CreateDto) {}
