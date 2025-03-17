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
import { Campaign_Prospects } from './campaign_prospects.entity';
import { Companies } from './companies.entity';
import { Company_Contact_Maps } from './company_contact_maps.entity';
import { Contact_Tags } from './contact_tags.entity';
import { Group_Members } from './group_members.entity';
import { Master_Contact_Types } from './master_contact_types.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_States } from './master_states.entity';
import { Zone_Contacts } from './zone_contacts.entity';

@Entity({ name: ENTITY_NAME.CONTACTS })
export class Contacts extends BaseEntity {
  @Column({ type: 'varchar', length: 512 })
  first_name: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  last_name: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  job_title: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  company_name: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  full_address: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zip_code: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  city: string;

  @Column({ type: 'timestamp', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'varchar', length: 128, nullable: true })
  tax_or_ssn: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mobile: string;

  @Column({ type: 'boolean' })
  sms_subscribed: boolean;

  @Column({ type: 'boolean' })
  whatsapp_number: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true })
  personal_email: string;

  @Column({ type: 'boolean' })
  personal_email_verified: boolean;

  @Column({ type: 'boolean' })
  personal_email_subscribed: boolean;

  @Column({ type: 'varchar', length: 256, nullable: true })
  business_email: string;

  @Column({ type: 'boolean' })
  business_email_verified: boolean;

  @Column({ type: 'boolean' })
  business_email_subscribed: boolean;

  @Column({ type: 'varchar', length: 128, nullable: true })
  years_of_experience: string;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @Column({ type: 'text', nullable: true })
  public_profile: string;

  @Column({ type: 'text', nullable: true })
  internal_profile_and_tags: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  twitter_x: string;

  @Column({ type: 'varchar', nullable: true })
  profile_picture: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  public_profile_url: string;

  @Column({ type: 'boolean' })
  verified: boolean;

  @Column({ type: 'text', nullable: true })
  internal_notes: string;

  @Column({ type: 'boolean' })
  archive: boolean;

  @Column({ type: 'boolean' })
  active_or_passive: boolean;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  referred_by_email: string;

  @RelationId((x: Contacts) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, (x) => x.contacts, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @RelationId((x: Contacts) => x.state)
  state_id: number;

  @ManyToOne(() => Master_States, (x) => x.contacts, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: Master_States;

  @RelationId((x: Contacts) => x.country)
  country_id: number;

  @ManyToOne(() => Master_Countries, (x) => x.contacts, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Master_Countries;

  @RelationId((x: Contacts) => x.verified_by_user)
  verified_by_user_id: number;

  @ManyToOne(() => App_Users, (x) => x.verified_contacts, { nullable: true })
  @JoinColumn({ name: 'verified_by_user_id' })
  verified_by_user: App_Users;

  @RelationId((x: Contacts) => x.master_contact_type)
  master_contact_type_id: number;

  @ManyToOne(() => Master_Contact_Types, (x) => x.contacts, { nullable: true })
  @JoinColumn({ name: 'master_contact_type_id' })
  master_contact_type: Master_Contact_Types;

  // External Relations
  @OneToMany(() => Contact_Tags, (x) => x.contact)
  contact_tags: Contact_Tags[];

  @OneToMany(() => Company_Contact_Maps, (x) => x.contact)
  company_contact_maps: Company_Contact_Maps[];

  @OneToMany(() => Group_Members, (x) => x.contact)
  group_members: Group_Members[];

  @OneToMany(() => Campaign_Prospects, (x) => x.contact)
  campaign_prospects: Campaign_Prospects[];

  @OneToMany(() => Zone_Contacts, (x) => x.contact)
  zone_contacts: Zone_Contacts[];
}
