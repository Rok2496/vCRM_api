import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Master_Work_Day_Types } from './master_work_day_types.entity';
import { Tutors } from './tutors.entity';

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

  @RelationId((x: Team_Weekly_Work_Schedules) => x.monday_work_day_type)
  monday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'monday_work_day_type_id' })
  monday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.tuesday_work_day_type)
  tuesday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'tuesday_work_day_type_id' })
  tuesday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.wednesday_work_day_type)
  wednesday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'wednesday_work_day_type_id' })
  wednesday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.thursday_work_day_type)
  thursday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'thursday_work_day_type_id' })
  thursday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.friday_work_day_type)
  friday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'friday_work_day_type_id' })
  friday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.saturday_work_day_type)
  saturday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'saturday_work_day_type_id' })
  saturday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.sunday_work_day_type)
  sunday_work_day_type_id: number;

  @ManyToOne(() => Master_Work_Day_Types, { nullable: true })
  @JoinColumn({ name: 'sunday_work_day_type_id' })
  sunday_work_day_type: Master_Work_Day_Types;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @RelationId((x: Team_Weekly_Work_Schedules) => x.tutor)
  tutor_id: number;

  @ManyToOne(() => Tutors, { nullable: true })
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutors;
} 