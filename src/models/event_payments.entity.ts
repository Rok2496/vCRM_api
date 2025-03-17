import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';
import { Events } from './events.entity';

@Entity('event_payments')
export class Event_Payments extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  payment_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  payment_amount: number;

  @Column({ type: 'varchar', length: 128, nullable: true })
  payment_method: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  transaction_id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  event_fee: number;

  @Column({ type: 'boolean', default: false })
  paid_by_guest: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true })
  guest_name: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  guest_address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  guest_phone: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  guest_email: string;

  @RelationId((x: Event_Payments) => x.event)
  event_id: number;

  @ManyToOne(() => Events)
  @JoinColumn({ name: 'event_id' })
  event: Events;

  @RelationId((x: Event_Payments) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
} 