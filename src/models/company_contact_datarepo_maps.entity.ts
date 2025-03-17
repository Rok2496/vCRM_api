import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';
import { Data_Repos } from './data_repos.entity';
import { Voters } from './voters.entity';

@Entity('company_contact_datarepo_maps')
export class Company_Contact_Datarepo_Maps extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  job_title: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: true })
  display_sequence: number;

  @RelationId((x: Company_Contact_Datarepo_Maps) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, { nullable: false })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @RelationId((x: Company_Contact_Datarepo_Maps) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, { nullable: false })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Company_Contact_Datarepo_Maps) => x.data_repository)
  data_repo_id: number;

  @ManyToOne(() => Data_Repos, { nullable: false })
  @JoinColumn({ name: 'data_repo_id' })
  data_repository: Data_Repos;

  @RelationId((x: Company_Contact_Datarepo_Maps) => x.voter)
  voter_id: number;

  @ManyToOne(() => Voters, { nullable: false })
  @JoinColumn({ name: 'voter_id' })
  voter: Voters;
} 