import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contacts } from './contacts.entity';
import { Data_Repos } from './data_repos.entity';
import { VoterTags } from './voter_tags.entity';

@Entity('Voters')
export class Voters extends BaseEntity {
  @Column({ type: 'text', nullable: true })
  first_name: string;

  @Column({ type: 'text', nullable: true })
  middle_name: string;

  @Column({ type: 'text', nullable: true })
  last_name: string;

  @Column({ type: 'text', nullable: true })
  name_suffix: string;

  @Column({ type: 'text', nullable: true })
  residence_address_number: string;

  @Column({ type: 'text', nullable: true })
  residence_half_code: string;

  @Column({ type: 'text', nullable: true })
  residence_pre_direction: string;

  @Column({ type: 'text', nullable: true })
  residence_street_name: string;

  @Column({ type: 'text', nullable: true })
  residence_post_direction: string;

  @Column({ type: 'text', nullable: true })
  residence_apartment_type: string;

  @Column({ type: 'text', nullable: true })
  residence_apartment_number: string;

  @Column({ type: 'text', nullable: true })
  residence_address_non_standard: string;

  @Column({ type: 'text', nullable: true })
  residence_city: string;

  @Column({ type: 'text', nullable: true })
  residence_zip_code_5: string;

  @Column({ type: 'text', nullable: true })
  residence_zip_code_4: string;

  @Column({ type: 'text', nullable: true })
  mailing_address_line_1: string;

  @Column({ type: 'text', nullable: true })
  mailing_address_line_2: string;

  @Column({ type: 'text', nullable: true })
  mailing_address_line_3: string;

  @Column({ type: 'text', nullable: true })
  mailing_address_line_4: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth: Date;

  @Column({ type: 'text', nullable: true })
  gender: string;

  @Column({ type: 'text', nullable: true })
  enrollment: string;

  @Column({ type: 'text', nullable: true })
  other_party: string;

  @Column({ type: 'integer', nullable: true })
  county_code: number;

  @Column({ type: 'integer', nullable: true })
  election_district: number;

  @Column({ type: 'integer', nullable: true })
  legislative_district: number;

  @Column({ type: 'text', nullable: true })
  town_city: string;

  @Column({ type: 'text', nullable: true })
  ward: string;

  @Column({ type: 'integer', nullable: true })
  congressional_district: number;

  @Column({ type: 'integer', nullable: true })
  senate_district: number;

  @Column({ type: 'integer', nullable: true })
  assembly_district: number;

  @Column({ type: 'text', nullable: true })
  last_voter_date: string;

  @Column({ type: 'text', nullable: true })
  previous_year_voted: string;

  @Column({ type: 'text', nullable: true })
  previous_county: string;

  @Column({ type: 'text', nullable: true })
  previous_address: string;

  @Column({ type: 'text', nullable: true })
  previous_name: string;

  @Column({ type: 'text', nullable: true })
  county_voter_registration_number: string;

  @Column({ type: 'text', nullable: true })
  registration_date: string;

  @Column({ type: 'text', nullable: true })
  voter_registration_source: string;

  @Column({ type: 'text', nullable: true })
  identification_required: string;

  @Column({ type: 'text', nullable: true })
  identification_met: string;

  @Column({ type: 'text', nullable: true })
  voter_status: string;

  @Column({ type: 'text', nullable: true })
  status_reason_code: string;

  @Column({ type: 'text', nullable: true })
  inactive_date: string;

  @Column({ type: 'text', nullable: true })
  purge_date: string;

  @Column({ type: 'text', nullable: true })
  state_board_of_elections_id: string;

  @Column({ type: 'text', nullable: true })
  voter_history: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  import_hash: string;

  @RelationId((x: Voters) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Voters) => x.data_repository)
  data_repo_id: number;

  @ManyToOne(() => Data_Repos, { nullable: true })
  @JoinColumn({ name: 'data_repo_id' })
  data_repository: Data_Repos;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mobile: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email_address: string;

  // External Relations
  @OneToMany(() => VoterTags, (x) => x.voter)
  voter_tags: VoterTags[];
} 