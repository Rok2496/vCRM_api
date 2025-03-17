import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Task_Events } from './task_events.entity';

@Entity({ name: ENTITY_NAME.MASTER_TASK_STATUS })
export class Master_Task_Statuses extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  color_code: string;

  @Column({ type: 'int', nullable: true })
  sequence: number;

  // Other Relations:
  @OneToMany(() => Task_Events, (x) => x.master_task_status)
  task_events: Task_Events[];
}
