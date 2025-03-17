import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Tasks } from './tasks.entity';
import { Employees } from './employees.entity';
import { App_Users } from './app_users.entity';

@Entity('task_teams')
export class Task_Teams extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @RelationId((x: Task_Teams) => x.task)
  task_id: number;

  @ManyToOne(() => Tasks, (tasks) => tasks.task_teams, { nullable: true })
  @JoinColumn({ name: 'task_id' })
  task: Tasks;

  @RelationId((x: Task_Teams) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @RelationId((x: Task_Teams) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
} 