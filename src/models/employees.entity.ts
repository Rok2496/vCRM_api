import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Campaign_Teams } from './campaign_teams.entity';
import { Campaigns } from './campaigns.entity';
import { Employee_Attendances } from './employee_attendances.entity';
import { Employee_Tags } from './employee_tags.entity';
import { Group_Members } from './group_members.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_Employee_Departments } from './master_employee_departments.entity';
import { Master_Employee_Job_Titles } from './master_employee_job_titles.entity';
import { Master_States } from './master_states.entity';
import { Task_Events } from './task_events.entity';
import { Tutors } from './tutors.entity';
import { Zone_Account_Teams } from './zone_account_teams.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.EMPLOYEES })
export class Employees extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  first_name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  full_address: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zip_code: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  city: string;

  @Column({ type: 'timestamp', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mobile: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  office_phone: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  personal_email: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  business_email: string;

  @Column({ type: 'text', nullable: true })
  employee_profile: string;

  @Column({ type: 'text', nullable: true })
  ssn_or_tax_number: string;

  @Column({ type: 'text', nullable: true })
  employee_customized_job_profile: string;

  @Column({ type: 'timestamp', nullable: true })
  hire_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  leave_date: Date;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  linked_in: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country_code: string;

  @Column({ type: 'boolean' })
  remote_employee: boolean;

  @Column({ type: 'boolean' })
  current_or_former_employee: boolean;

  @Column({ type: 'varchar', nullable: true })
  profile_picture_id: string;

  @RelationId((x: Employees) => x.country)
  country_id: number;

  @ManyToOne(() => Master_Countries, (x) => x.employees, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Master_Countries;

  @RelationId((x: Employees) => x.state)
  state_id: number;

  @ManyToOne(() => Master_States, (x) => x.employees, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: Master_States;

  @RelationId((x: Employees) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.employees, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: Employees) => x.employee_master_department)
  employee_master_department_id: number;

  @ManyToOne(() => Master_Employee_Departments, { nullable: true })
  @JoinColumn({ name: 'employee_master_department_id' })
  employee_master_department: Master_Employee_Departments;

  @RelationId((x: Employees) => x.employee_master_job_title)
  employee_master_job_title_id: number;

  @ManyToOne(() => Master_Employee_Job_Titles, { nullable: true })
  @JoinColumn({ name: 'employee_master_job_title_id' })
  employee_master_job_title: Master_Employee_Job_Titles;

  @RelationId((x: Employees) => x.tutor)
  tutor_id: number;

  @ManyToOne(() => Tutors, { nullable: true })
  @JoinColumn({ name: 'tutor_id' })
  tutor: Tutors;

  @OneToMany(() => Task_Events, (x) => x.employee)
  task_events: Task_Events[];

  @OneToMany(() => Zone_Account_Teams, (x) => x.employee)
  zone_account_teams: Zone_Account_Teams[];

  @OneToMany(() => Employee_Tags, (x) => x.employee)
  employee_tags: Employee_Tags[];

  @OneToMany(() => Employee_Tags, (x) => x.rated_by_employee)
  rated_by_employee_tags: Employee_Tags[];

  @OneToMany(() => Employee_Attendances, (x) => x.employee)
  employee_attendances: Employee_Attendances[];

  @OneToMany(() => Group_Members, (x) => x.employee)
  group_members: Group_Members[];

  @OneToMany(() => Campaigns, (x) => x.campaign_manager)
  managed_campaigns: Campaigns[];

  @OneToMany(() => Campaign_Teams, (x) => x.employee)
  campaign_teams: Campaign_Teams[];

  @OneToMany(() => Zones, (x) => x.manager_employee)
  manager_employee_zones: Zones[];

  @OneToMany(() => App_Users, (x) => x.employees)
  app_users: App_Users[];
}
