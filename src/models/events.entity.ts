import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Master_Task_Statuses } from './master_task_statuses.entity';
import { Event_Teams_Guests } from './event_teams_guests.entity';
import { Event_Payments } from './event_payments.entity';

@Entity('events')
export class Events extends BaseEntity {
  @Column({ type: 'varchar', length: 2048 })
  event_title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date_time: Date;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  location: string;

  @Column({ type: 'boolean' })
  online_onsite_event: boolean;

  @Column({ type: 'varchar', length: 128, nullable: true })
  event_type: string;

  @Column({ type: 'boolean' })
  event_status_open_closed: boolean;

  @Column({ type: 'varchar', nullable: true })
  event_image: string;

  @Column({ type: 'varchar', nullable: true })
  event_video: string;

  @Column({ type: 'boolean' })
  rsvp_required: boolean;

  @Column({ type: 'boolean' })
  free_or_paid_event: boolean;

  @Column({ type: 'boolean' })
  publish_on_website: boolean;

  @Column({ type: 'boolean' })
  open_to_public_or_invitation_only: boolean;

  @RelationId((x: Events) => x.master_task_status_type)
  master_task_status_type_id: number;

  @ManyToOne(() => Master_Task_Statuses, { nullable: true })
  @JoinColumn({ name: 'master_task_status_type_id' })
  master_task_status_type: Master_Task_Statuses;

  @RelationId((x: Events) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  // External Relations
  @OneToMany(() => Event_Teams_Guests, (event_teams_guests) => event_teams_guests.event)
  event_teams_guests: Event_Teams_Guests[];

  @OneToMany(() => Event_Payments, (event_payments) => event_payments.event)
  event_payments: Event_Payments[];
} 