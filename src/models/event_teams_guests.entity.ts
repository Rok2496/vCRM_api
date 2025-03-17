import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';
import { Events } from './events.entity';
import { Contacts } from './contacts.entity';

@Entity('event_teams_guests')
export class Event_Teams_Guests extends BaseEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  organization: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  job_title: string;

  @Column({ type: 'boolean', default: false })
  is_attending: boolean;

  @Column({ type: 'timestamp', nullable: true })
  rsvp_date: Date;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @RelationId((x: Event_Teams_Guests) => x.event)
  event_id: number;

  @ManyToOne(() => Events)
  @JoinColumn({ name: 'event_id' })
  event: Events;

  @RelationId((x: Event_Teams_Guests) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Event_Teams_Guests) => x.invited_by)
  invited_by_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'invited_by_id' })
  invited_by: App_Users;
} 