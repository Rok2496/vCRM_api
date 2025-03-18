import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateWebhookDataDto {
  @ApiProperty({
    description: 'Webhook details containing metadata about the webhook event',
    example: {
      upserted: true,
      status: 'success',
      zap: 'zapier-flow-123',
      dataSource: 'external-system',
      webhookSource: 'zapier',
      target: 'contact',
      functionName: 'processWebhook'
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  webhookDetails?: {
    upserted: boolean;
    status: string;
    zap?: string;
    dataSource?: string;
    webhookSource?: string;
    target: string;
    functionName?: string;
  };

  @ApiProperty({
    description: 'The payload data received from the webhook',
    example: {
      id: 123,
      name: 'John Doe',
      email: 'john@example.com'
    },
    required: false,
  })
  @IsObject()
  @IsOptional()
  payload?: Record<string, any>;

  @ApiProperty({
    description: 'The source type of the webhook',
    example: 'zapier',
    required: false,
  })
  @IsString()
  @IsOptional()
  sourceType?: string;

  @ApiProperty({
    description: 'The event type that triggered the webhook',
    example: 'contact.created',
    required: false,
  })
  @IsString()
  @IsOptional()
  eventType?: string;
}