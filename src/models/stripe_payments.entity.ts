import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export enum PaymentType {
  ONE_TIME = 'one_time',
  SUBSCRIPTION = 'subscription',
}

@Entity({ name: ENTITY_NAME.STRIPE_PAYMENTS })
export class Stripe_Payment extends BaseEntity {
  @Column({ type: 'varchar' })
  stripe_payment_intent_id: string;

  @Column({ type: 'varchar', nullable: true })
  stripe_invoice_id: string;

  @Column({ type: 'varchar' })
  status: PaymentStatus;

  @Column({ type: 'varchar' })
  payment_type: PaymentType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar' })
  currency: string;

  @Column({ type: 'jsonb', nullable: true })
  payment_metadata: Record<string, any>;

  @Column({ type: 'varchar', nullable: true })
  receipt_url: string;

  @RelationId((x: Stripe_Payment) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.stripe_payments)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: Stripe_Payment) => x.user)
  course_id: number;
}
