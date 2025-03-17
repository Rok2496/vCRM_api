import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';

@Entity('team_weekly_work_schedules')
export class Team_Weekly_Work_Schedules extends BaseEntity {
  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'float', nullable: true })
  number_of_work_hours_per_day: number;

  @Column({ type: 'float', nullable: true })
  number_of_work_hours_per_week: number;

  @Column({ type: 'float', nullable: true })
  number_of_work_hours_per_month: number;

  @Column({ type: 'time', nullable: true })
  monday_start_time: string;

  @Column({ type: 'time', nullable: true })
  monday_end_time: string;

  @Column({ type: 'boolean' })
  monday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  tuesday_start_time: string;

  @Column({ type: 'time', nullable: true })
  tuesday_end_time: string;

  @Column({ type: 'boolean' })
  tuesday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  wednesday_start_time: string;

  @Column({ type: 'time', nullable: true })
  wednesday_end_time: string;

  @Column({ type: 'boolean' })
  wednesday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  thursday_start_time: string;

  @Column({ type: 'time', nullable: true })
  thursday_end_time: string;

  @Column({ type: 'boolean' })
  thursday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  friday_start_time: string;

  @Column({ type: 'time', nullable: true })
  friday_end_time: string;

  @Column({ type: 'boolean' })
  friday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  saturday_start_time: string;

  @Column({ type: 'time', nullable: true })
  saturday_end_time: string;

  @Column({ type: 'boolean' })
  saturday_onsite_or_remote: boolean;

  @Column({ type: 'time', nullable: true })
  sunday_start_time: string;

  @Column({ type: 'time', nullable: true })
  sunday_end_time: string;

  @Column({ type: 'boolean' })
  sunday_onsite_or_remote: boolean;

  @Column({ nullable: true })
  monday_work_day_type_id: number;

  @Column({ nullable: true })
  tuesday_work_day_type_id: number;

  @Column({ nullable: true })
  wednesday_work_day_type_id: number;

  @Column({ nullable: true })
  thursday_work_day_type_id: number;

  @Column({ nullable: true })
  friday_work_day_type_id: number;

  @Column({ nullable: true })
  saturday_work_day_type_id: number;

  @Column({ nullable: true })
  sunday_work_day_type_id: number;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
} 