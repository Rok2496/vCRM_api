import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Task_Events } from './task_events.entity';

@Entity({ name: ENTITY_NAME.TASK_DOCUMENTS })
export class Task_Documents extends BaseEntity {
  @Column({ type: 'varchar', length: 1024 })
  name: string;

  @Column({ type: 'varchar' })
  file_binary_object_id: string;

  @RelationId((x: Task_Documents) => x.task_event)
  task_event_id: number;

  @ManyToOne(() => Task_Events, (x) => x.task_documents, { nullable: true })
  @JoinColumn({ name: 'task_event_id' })
  task_event: Task_Events;
}
