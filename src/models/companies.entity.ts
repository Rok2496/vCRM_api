import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Campaign_Prospects } from './campaign_prospects.entity';
import { Company_Contact_Maps } from './company_contact_maps.entity';
import { Company_Tags } from './company_tags.entity';
import { Contacts } from './contacts.entity';
import { Master_Company_Types } from './master_company_types.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_States } from './master_states.entity';
import { Zone_Companies } from './zone_companies.entity';

@Entity({ name: ENTITY_NAME.COMPANIES })
export class Companies extends BaseEntity {
  @Column({ type: 'varchar', length: 2048 })
  name: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  trade_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  custom_id: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  year_of_establishment: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  industry: string;

  @Column({ type: 'float', nullable: true })
  market_cap: number;

  @Column({ type: 'text', nullable: true })
  full_address: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  address1: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  address2: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zip_code: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  fax: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 2048, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  ein_tax_id: string;

  @Column({ type: 'varchar', nullable: true })
  logo_binary_object: string;

  @Column({ type: 'text', nullable: true })
  internal_remarks: string;

  @Column({ type: 'boolean' })
  verified: boolean;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  linkedin: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  twitter: string;

  @RelationId((x: Companies) => x.master_company_type)
  master_company_type_id: number;

  @ManyToOne(() => Master_Company_Types, (x) => x.companies, { nullable: true })
  @JoinColumn({ name: 'master_company_type_id' })
  master_company_type: Master_Company_Types;

  @RelationId((x: Companies) => x.country)
  country_id: number;

  @ManyToOne(() => Master_Countries, (x) => x.companies, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Master_Countries;

  @RelationId((x: Companies) => x.state)
  state_id: number;

  @ManyToOne(() => Master_States, (x) => x.companies, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: Master_States;

  // External Relations
  @OneToMany(() => Company_Tags, (x) => x.company)
  company_tags: Company_Tags[];

  @OneToMany(() => Contacts, (x) => x.company)
  contacts: Contacts[];

  @OneToMany(() => Company_Contact_Maps, (x) => x.company)
  company_contact_maps: Company_Contact_Maps[];

  @OneToMany(() => Campaign_Prospects, (x) => x.company)
  campaign_prospects: Campaign_Prospects[];

  @OneToMany(() => Zone_Companies, (x) => x.company)
  zone_companies: Zone_Companies[];
}
