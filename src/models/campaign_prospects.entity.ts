import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Campaigns } from './campaigns.entity';
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';
import { Data_Repos } from './data_repos.entity';

@Entity({ name: ENTITY_NAME.CAMPAIGN_PROSPECTS })
export class Campaign_Prospects extends BaseEntity {
  @Column({ type: 'int', nullable: true })
  Prospect_score: number;

  @RelationId((x: Campaign_Prospects) => x.campaign)
  campaign_id: number;

  @ManyToOne(() => Campaigns, (x) => x.campaign_prospects, { nullable: true })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaigns;

  @RelationId((x: Campaign_Prospects) => x.voter)
  voter_id: number;

  @ManyToOne(() => Contacts, { nullable: true })
  @JoinColumn({ name: 'voter_id' })
  voter: Contacts;

  @RelationId((x: Campaign_Prospects) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, (x) => x.campaign_prospects, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @RelationId((x: Campaign_Prospects) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (x) => x.campaign_prospects, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Campaign_Prospects) => x.data_repository)
  data_repo_id: number;

  @ManyToOne(() => Data_Repos, (x) => x.campaign_prospects, {
    nullable: true,
  })
  @JoinColumn({ name: 'data_repo_id' })
  data_repository: Data_Repos;
}
