import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { App_Users } from './app_users.entity';
import { Tasks } from './tasks.entity';
import { Task_Events } from './task_events.entity';

@Entity('task_notes')
export class Task_Notes extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_time: Date;

  @RelationId((x: Task_Notes) => x.creator_user)
  creator_user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'creator_user_id' })
  creator_user: App_Users;

  @RelationId((x: Task_Notes) => x.task)
  task_id: number;

  @ManyToOne(() => Tasks, { nullable: true })
  @JoinColumn({ name: 'task_id' })
  task: Tasks;
  
  @RelationId((x: Task_Notes) => x.task_event)
  task_event_id: number;

  @ManyToOne(() => Task_Events, (x) => x.task_notes, { nullable: true })
  @JoinColumn({ name: 'task_event_id' })
  task_event: Task_Events;
}
