import { PartialType } from '@nestjs/swagger';
import { CreateWebhookDataDto } from './create.dto';

export class UpdateWebhookDataDto extends PartialType(CreateWebhookDataDto) {} 