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
import { Campaign_Teams } from './campaign_teams.entity';
import { Employees } from './employees.entity';

@Entity({ name: ENTITY_NAME.CAMPAIGNS })
export class Campaigns extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  campaign_goal: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  location: string;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @Column({ type: 'int', nullable: true })
  Duration_days: number;

  @Column({ type: 'float', nullable: true })
  projected_donation: number;

  @Column({ type: 'float', nullable: true })
  donation_earned: number;

  @Column({ type: 'float', nullable: true })
  projected_reachout: number;

  @Column({ type: 'float', nullable: true })
  reachout_acheived: number;

  @Column({ type: 'float', nullable: true })
  campaign_budget: number;

  @Column({ type: 'int', nullable: true })
  status_open_closed: number;

  @Column({ type: 'varchar', length: 5000, nullable: true })
  campaign_tags: string;

  @RelationId((x: Campaigns) => x.campaign_manager)
  campaign_manager_employee_id: number;

  @ManyToOne(() => Employees, (x) => x.managed_campaigns, { nullable: true })
  @JoinColumn({ name: 'campaign_manager_employee_id' })
  campaign_manager: Employees;

  // External Relations
  @OneToMany(() => Campaign_Prospects, (x) => x.campaign)
  campaign_prospects: Campaign_Prospects[];

  @OneToMany(() => Campaign_Teams, (x) => x.campaign)
  campaign_teams: Campaign_Teams[];
}
