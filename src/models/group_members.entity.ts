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

@Entity('group_members')
export class Group_Members extends BaseEntity {
  @Column({ type: 'boolean', default: false })
  is_admin: boolean;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  joined_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  left_date: Date;

  @RelationId((x: Group_Members) => x.group)
  group_id: number;

  @ManyToOne(() => Groups, (groups) => groups.group_members)
  @JoinColumn({ name: 'group_id' })
  group: Groups;

  @RelationId((x: Group_Members) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
  
  @RelationId((x: Group_Members) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.group_members, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
  
  @RelationId((x: Group_Members) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (x) => x.group_members, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  // External Relations
  @OneToMany(() => Group_Messages, (x) => x.group_member)
  group_messages: Group_Messages[];
}
