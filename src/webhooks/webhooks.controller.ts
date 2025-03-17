import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CampaignWebhookDto, ContactWebhookDto } from './dto';
import { WebhooksService } from './webhooks.service';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('zapier/contacts')
  @ApiOperation({ summary: 'Handle Zapier contact webhook' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async handleZapierContactWebhook(
    @Body() payload: ContactWebhookDto,
    @Headers() headers: Record<string, string>,
  ) {
    try {
      if (headers['user-agent']?.toLowerCase() !== 'zapier') {
        throw new HttpException('Invalid user agent', HttpStatus.BAD_REQUEST);
      }

      return await this.webhooksService.handleZapierContactWebhook(
        payload,
        headers,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error processing webhook',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('zapier/campaigns')
  @ApiOperation({ summary: 'Handle Zapier campaign webhook' })
  @ApiResponse({ status: 200, description: 'Webhook processed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async handleZapierCampaignWebhook(
    @Body() payload: CampaignWebhookDto,
    @Headers() headers: Record<string, string>,
  ) {
    try {
      if (headers['user-agent']?.toLowerCase() !== 'zapier') {
        throw new HttpException('Invalid user agent', HttpStatus.BAD_REQUEST);
      }

      return await this.webhooksService.handleZapierCampaignWebhook(
        payload,
        headers,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Error processing webhook',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
