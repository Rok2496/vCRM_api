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
import { Contacts } from './contacts.entity';
import { Employees } from './employees.entity';
import { Group_Messages } from './group_messages.entity';
import { Groups } from './groups.entity';

@Entity({ name: ENTITY_NAME.GROUP_MEMBERS })
export class Group_Members extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_title: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  country_code: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  profile_picture_id: string;

  @Column({ type: 'boolean' })
  allow_send_message: boolean;

  @Column({ type: 'boolean' })
  group_admin: boolean;

  @Column({ type: 'boolean' })
  active_member_or_removed: boolean;

  @RelationId((x: Group_Members) => x.group)
  group_id: number;

  @ManyToOne(() => Groups, (group) => group.group_members, { nullable: true })
  @JoinColumn({ name: 'group_id' })
  group: Groups;

  @RelationId((x: Group_Members) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (group) => group.group_members, {
    nullable: true,
  })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @RelationId((x: Group_Members) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (group) => group.group_members, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Group_Members) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (user) => user.group_members, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  // External Relations
  @OneToMany(() => Group_Messages, (x) => x.group_member)
  group_messages: Group_Messages[];
}
