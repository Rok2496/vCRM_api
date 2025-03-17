import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { WebhookData } from '../models/webhook_data.entity';
import { CampaignWebhookDto, ContactWebhookDto } from './dto';

@Injectable()
export class WebhooksService {
  constructor(
    @InjectRepository(WebhookData)
    private webhookDataRepository: Repository<WebhookData>,
    private configService: ConfigService,
  ) {}

  async handleZapierContactWebhook(
    payload: ContactWebhookDto,
    headers: Record<string, string>,
  ) {
    const webhookDetails = {
      upserted: false,
      status: '',
      zap: headers['zap'],
      dataSource: headers['data-source'],
      webhookSource: headers['user-agent'],
      target: 'zapier-contact',
    };

    try {
      // Store webhook data
      await this.webhookDataRepository.save({
        webhookDetails,
        payload,
        sourceType: 'zapier',
        eventType: 'contact',
      });

      // Process contact data here
      // Add your contact processing logic

      webhookDetails.upserted = true;
      webhookDetails.status = 'Contact processed successfully';

      // Update webhook data with final status
      await this.webhookDataRepository.save({
        webhookDetails,
        payload,
        sourceType: 'zapier',
        eventType: 'contact',
      });

      return {
        success: true,
        message: 'Contact webhook processed successfully',
      };
    } catch (error) {
      console.error('Error processing contact webhook:', error);
      throw error;
    }
  }

  async handleZapierCampaignWebhook(
    payload: CampaignWebhookDto,
    headers: Record<string, string>,
  ) {
    const webhookDetails = {
      upserted: false,
      status: '',
      zap: headers['zap'],
      dataSource: headers['data-source'],
      webhookSource: headers['user-agent'],
      target: 'zapier-campaign',
    };

    try {
      // Store webhook data
      await this.webhookDataRepository.save({
        webhookDetails,
        payload,
        sourceType: 'zapier',
        eventType: 'campaign',
      });

      // Process campaign data here
      // Add your campaign processing logic

      webhookDetails.upserted = true;
      webhookDetails.status = 'Campaign processed successfully';

      // Update webhook data with final status
      await this.webhookDataRepository.save({
        webhookDetails,
        payload,
        sourceType: 'zapier',
        eventType: 'campaign',
      });

      return {
        success: true,
        message: 'Campaign webhook processed successfully',
      };
    } catch (error) {
      console.error('Error processing campaign webhook:', error);
      throw error;
    }
  }

  async sendWebhookToZapier(eventType: string, data: any) {
    const config = this.configService.get('webhook.zapier');
    let webhookUrl: string;
    let webhookSecret: string;

    switch (eventType) {
      case 'contact':
        webhookUrl = config.contacts.outbound.url;
        webhookSecret = config.contacts.outbound.secret;
        break;
      case 'campaign':
        webhookUrl = config.campaigns.outbound.url;
        webhookSecret = config.campaigns.outbound.secret;
        break;
      default:
        throw new Error(`Unsupported event type: ${eventType}`);
    }

    if (!webhookUrl) {
      throw new Error(
        `Zapier webhook URL not configured for event type: ${eventType}`,
      );
    }

    try {
      const headers = webhookSecret
        ? { 'X-Webhook-Secret': webhookSecret }
        : {};

      const response = await axios.post(webhookUrl, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error sending webhook to Zapier:', error);
      throw error;
    }
  }
}
