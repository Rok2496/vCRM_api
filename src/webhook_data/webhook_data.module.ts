import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookData } from '../models/webhook_data.entity';
import { WebhookDataController } from './webhook_data.controller';
import { WebhookDataService } from './webhook_data.service';

@Module({
  imports: [TypeOrmModule.forFeature([WebhookData])],
  controllers: [WebhookDataController],
  providers: [WebhookDataService],
  exports: [WebhookDataService],
})
export class WebhookDataModule {} 