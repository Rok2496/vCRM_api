import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { App_Users } from './app_users.entity';
import { Master_Task_Statuses } from './master_task_statuses.entity';
import { Task_Notes } from './task_notes.entity';
import { Task_Documents } from './task_documents.entity';
import { Task_Teams } from './task_teams.entity';

@Entity('tasks')
export class Tasks extends BaseEntity {
  @Column({ type: 'boolean' })
  task_or_event: boolean;

  @Column({ type: 'varchar', length: 2048 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date_time: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date_time: Date;

  @Column({ type: 'boolean', default: true })
  open_or_closed: boolean;

  @RelationId((x: Tasks) => x.master_task_status_type)
  master_task_status_type_id: number;

  @ManyToOne(() => Master_Task_Statuses, { nullable: true })
  @JoinColumn({ name: 'master_task_status_type_id' })
  master_task_status_type: Master_Task_Statuses;

  @RelationId((x: Tasks) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @RelationId((x: Tasks) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  // External Relations
  @OneToMany(() => Task_Notes, (task_notes) => task_notes.task)
  task_notes: Task_Notes[];

  @OneToMany(() => Task_Documents, (task_documents) => task_documents.task)
  task_documents: Task_Documents[];

  @OneToMany(() => Task_Teams, (task_teams) => task_teams.task)
  task_teams: Task_Teams[];
} 