import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tasks } from './tasks.entity';

@Entity('task_documents')
export class Task_Documents extends BaseEntity {
  @Column({ type: 'varchar', length: 1024 })
  name: string;

  @Column({ type: 'varchar' })
  file_binary_object_id: string;

  @RelationId((x: Task_Documents) => x.task)
  task_id: number;

  @ManyToOne(() => Tasks, { nullable: true })
  @JoinColumn({ name: 'task_id' })
  task: Tasks;
}
