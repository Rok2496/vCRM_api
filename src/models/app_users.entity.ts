import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { App_Notifications } from './app_notifications.entity';
import { App_Roles } from './app_roles.entity';
import { App_User_Custom_Permissions } from './app_user_custom_permissions.entity';
import { App_User_Otps } from './app_user_otps.entity';
import { App_User_Roles } from './app_user_roles.entity';
import { BaseEntity } from './base.entity';
import { Contacts } from './contacts.entity';
import { Employee_Attendances } from './employee_attendances.entity';
import { Employees } from './employees.entity';
import { Group_Members } from './group_members.entity';
import { Groups } from './groups.entity';
import { Master_Countries } from './master_countries.entity';
import { Stripe_Payment } from './stripe_payments.entity';
import { Stripe_Subscription } from './stripe_subscriptions.entity';
import { Task_Notes } from './task_notes.entity';
import { Zone_Account_Teams } from './zone_account_teams.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.APP_USERS })
export class App_Users extends BaseEntity {
  @Column({ type: 'boolean', default: false })
  is_super_admin: boolean;

  @Column({ type: 'varchar', length: 256, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 512 })
  password_hash: string;

  @Column({ type: 'varchar', length: 128 })
  first_name: string;

  @Column({ type: 'varchar', length: 128 })
  last_name: string;

  @Column({ type: 'varchar', length: 256, unique: true })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  phone_number: string;

  @Column({ type: 'boolean', default: true })
  active_or_archive: boolean;

  @Column({ type: 'boolean', default: false })
  email_confirmed: boolean;

  @Column({ type: 'boolean', default: false })
  account_lock: boolean;

  @Column({ type: 'boolean', default: false })
  phone_number_confirmed: boolean;

  @Column({ type: 'boolean', default: false })
  two_factor_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  lockout_enabled: boolean;

  @Column({ type: 'int', default: 0 })
  access_failed_count: number;

  @Column({ nullable: true, type: 'timestamp' })
  lockout_end: Date;

  @Column({ type: 'varchar', length: 512, nullable: true })
  security_stamp: string;

  @Column({ nullable: true, type: 'varchar' })
  profile_picture: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  profile_picture_url: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  profile_picture_thumbnail_url: string;

  @Column({ type: 'boolean', default: false })
  whatsapp_subscribed: boolean;

  @Column({ type: 'boolean', default: false })
  email_subscribed: boolean;

  @Column({ type: 'boolean', default: false })
  sms_subscribed: boolean;

  @RelationId((x: App_Users) => x.master_country)
  master_country_id: number;

  @ManyToOne(() => Master_Countries, (x) => x.app_users, { nullable: true })
  @JoinColumn({ name: 'master_country_id' })
  master_country: Master_Countries;

  @RelationId((x: App_Users) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, (x) => x.app_users, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @RelationId((x: App_Users) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.app_users, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @Column({ nullable: true })
  customer_id_stripe: string;

  @Column({ nullable: true })
  active_subscription_id: string;

  @RelationId((x: App_Users) => x.primary_role)
  primary_role_id: number;

  @ManyToOne(() => App_Roles, (x) => x.app_users, { nullable: true })
  @JoinColumn({ name: 'primary_role_id' })
  primary_role: App_Roles;

  // External Relations
  @OneToMany(() => App_User_Roles, (x) => x.user)
  app_user_roles: App_User_Roles[];

  @OneToMany(() => App_User_Custom_Permissions, (x) => x.user)
  app_user_custom_permissions: App_User_Custom_Permissions[];

  @OneToMany(() => App_Notifications, (x) => x.user)
  app_notifications: App_Notifications[];

  @OneToMany(() => Zone_Account_Teams, (x) => x.user)
  zone_account_teams: Zone_Account_Teams[];

  @OneToMany(() => Task_Notes, (x) => x.creator_user)
  task_notes: Task_Notes[];

  @OneToMany(() => Employees, (x) => x.user)
  employees: Employees[];

  @OneToMany(() => Employee_Attendances, (x) => x.manager_approval_user)
  manager_approval_employee_attendances: Employee_Attendances[];

  @OneToMany(() => Contacts, (x) => x.verified_by_user)
  verified_contacts: Contacts[];

  @OneToMany(() => Groups, (x) => x.created_by_user)
  groups: Groups[];

  @OneToMany(() => Group_Members, (x) => x.user)
  group_members: Group_Members[];

  @OneToMany(() => Stripe_Payment, (x) => x.user)
  stripe_payments: Stripe_Payment[];

  @OneToMany(() => Stripe_Subscription, (x) => x.user)
  stripe_subscriptions: Stripe_Subscription[];

  @OneToMany(() => App_User_Otps, (x) => x.user)
  app_user_otps: App_User_Otps[];
}
