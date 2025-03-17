import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';
import { Employees } from './employees.entity';
import { Voters } from './voters.entity';

@Entity('crm_notes')
export class CRM_Notes extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date_time: Date;

  @RelationId((x: CRM_Notes) => x.creator_user)
  creator_user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'creator_user_id' })
  creator_user: App_Users;

  @RelationId((x: CRM_Notes) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @RelationId((x: CRM_Notes) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: CRM_Notes) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;

  @RelationId((x: CRM_Notes) => x.voter)
  voter_id: number;

  @ManyToOne(() => Voters, { nullable: true })
  @JoinColumn({ name: 'voter_id' })
  voter: Voters;
} 