import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

export enum SubscriptionStatus {
  ACTIVE = 'active',
  CANCELED = 'canceled',
  INCOMPLETE = 'incomplete',
  INCOMPLETE_EXPIRED = 'incomplete_expired',
  PAST_DUE = 'past_due',
  TRIALING = 'trialing',
  UNPAID = 'unpaid',
}

@Entity({ name: ENTITY_NAME.STRIPE_SUBSCRIPTIONS })
export class Stripe_Subscription extends BaseEntity {
  @Column({ type: 'varchar' })
  stripe_subscription_id: string;

  @Column({ type: 'varchar' })
  stripe_price_id: string;

  @Column({ type: 'varchar' })
  status: SubscriptionStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'timestamp' })
  current_period_start: Date;

  @Column({ type: 'timestamp' })
  current_period_end: Date;

  @Column({ type: 'boolean', default: false })
  cancel_at_period_end: boolean;

  @Column({ type: 'jsonb', nullable: true })
  subscription_metadata: Record<string, any>;

  @RelationId((x: Stripe_Subscription) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.stripe_subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
}
