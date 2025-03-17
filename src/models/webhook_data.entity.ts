import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('webhook_data')
export class WebhookData extends BaseEntity {
  @Column({ type: 'jsonb', nullable: true })
  webhookDetails: {
    upserted: boolean;
    status: string;
    zap?: string;
    dataSource?: string;
    webhookSource?: string;
    target: string;
    functionName?: string;
  };

  @Column({ type: 'jsonb', nullable: true })
  payload: Record<string, any>;

  @Column({ nullable: true })
  sourceType: string;

  @Column({ nullable: true })
  eventType: string;
}
