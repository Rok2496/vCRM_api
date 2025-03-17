import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Campaigns } from './campaigns.entity';
import { Employees } from './employees.entity';

@Entity({ name: ENTITY_NAME.CAMPAIGN_TEAMS })
export class Campaign_Teams extends BaseEntity {
  @Column({ type: 'boolean' })
  primary: boolean;

  @Column({ type: 'timestamp', nullable: true })
  assigned_date: Date;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @RelationId((x: Campaign_Teams) => x.campaign)
  campaign_id: number;

  @ManyToOne(() => Campaigns, (x) => x.campaign_teams, { nullable: true })
  @JoinColumn({ name: 'campaign_id' })
  campaign: Campaigns;

  @RelationId((x: Campaign_Teams) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.campaign_teams, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
}
