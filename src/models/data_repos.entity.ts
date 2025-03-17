import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Campaign_Prospects } from './campaign_prospects.entity';

@Entity({ name: ENTITY_NAME.DATA_REPOS })
export class Data_Repos extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  first_name: string;

  @Column({ type: 'text', nullable: true })
  middle_name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @Column({ type: 'text', nullable: true })
  organization_name: string;

  @Column({ type: 'text', nullable: true })
  job_title: string;

  @Column({ type: 'text', nullable: true })
  zip_code: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  street_address: string;

  @Column({ type: 'text', nullable: true })
  mobile: string;

  @Column({ type: 'text', nullable: true })
  home_phone: string;

  @Column({ type: 'text', nullable: true })
  office_phone: string;

  @Column({ type: 'text', nullable: true })
  fax: string;

  @Column({ type: 'text', nullable: true })
  business_email: string;

  @Column({ type: 'text', nullable: true })
  personal_email: string;

  @Column({ type: 'boolean' })
  business_email_validated: boolean;

  @Column({ type: 'boolean' })
  personal_email_validated: boolean;

  @Column({ type: 'text', nullable: true })
  linkedin: string;

  @Column({ type: 'text', nullable: true })
  facebook: string;

  @Column({ type: 'text', nullable: true })
  twitter: string;

  @Column({ type: 'text', nullable: true })
  internal_remarks: string;

  @Column({ type: 'text', nullable: true })
  contact_resume_profile: string;

  @Column({ type: 'text', nullable: true })
  sic_naics_description: string;

  @Column({ type: 'text', nullable: true })
  company_website: string;

  @Column({ type: 'text', nullable: true })
  full_address: string;

  @Column({ type: 'text', nullable: true })
  city: string;

  @Column({ type: 'text', nullable: true })
  county: string;

  @Column({ type: 'text', nullable: true })
  state: string;

  @Column({ type: 'text', nullable: true })
  country: string;

  @Column({ type: 'text', nullable: true })
  sic_code: string;

  @Column({ type: 'text', nullable: true })
  industry: string;

  @Column({ type: 'text', nullable: true })
  company_revenue: string;

  @Column({ type: 'text', nullable: true })
  employee_size: string;

  @Column({ type: 'text', nullable: true })
  tags: string;

  @Column({ type: 'boolean' })
  verified: boolean;

  // External Relations
  @OneToMany(() => Campaign_Prospects, (x) => x.data_repository)
  campaign_prospects: Campaign_Prospects[];
}
