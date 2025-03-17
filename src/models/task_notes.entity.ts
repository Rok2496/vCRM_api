import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Task_Events } from './task_events.entity';

@Entity({ name: ENTITY_NAME.TASK_NOTES })
export class Task_Notes extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', default: 'NOW()' })
  creation_time: Date;

  @RelationId((x: Task_Notes) => x.creator_user)
  creator_user_id: number;

  @ManyToOne(() => App_Users, (x) => x.task_notes)
  @JoinColumn({ name: 'creator_user_id' })
  creator_user: App_Users;

  @RelationId((x: Task_Notes) => x.task_event)
  task_event_id: number;

  @ManyToOne(() => Task_Events, (x) => x.task_notes)
  @JoinColumn({ name: 'task_event_id' })
  task_event: Task_Events;
}
