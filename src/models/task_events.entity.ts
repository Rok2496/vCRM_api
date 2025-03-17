import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Master_Task_Statuses } from './master_task_statuses.entity';
import { Task_Documents } from './task_documents.entity';
import { Task_Notes } from './task_notes.entity';

@Entity({ name: ENTITY_NAME.TASK_EVENTS })
export class Task_Events extends BaseEntity {
  @Column({ type: 'boolean' })
  task_or_event: boolean;

  @Column({ type: 'varchar', length: 2048 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true, type: 'timestamp' })
  start_date_time: Date;

  @Column({ nullable: true, type: 'timestamp' })
  end_date_time: Date;

  @Column({ nullable: true, type: 'float' })
  estimated_time_in_hours: number;

  @Column({ nullable: true, type: 'float' })
  actual_time_in_hours: number;

  @Column({ type: 'boolean' })
  save_as_template: boolean;

  @RelationId((x: Task_Events) => x.master_task_status)
  master_task_status_type_id: number;

  @ManyToOne(() => Master_Task_Statuses, (x) => x.task_events, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_task_status_type_id' })
  master_task_status: Master_Task_Statuses;

  @RelationId((x: Task_Events) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.task_events, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @OneToMany(() => Task_Documents, (x) => x.task_event)
  task_documents: Task_Documents[];

  @OneToMany(() => Task_Notes, (x) => x.task_event)
  task_notes: Task_Notes[];
}
