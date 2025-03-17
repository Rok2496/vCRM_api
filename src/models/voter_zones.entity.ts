import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Data_Repos } from './data_repos.entity';
import { Voters } from './voters.entity';
import { Zones } from './zones.entity';

@Entity('VoterZones')
export class VoterZones extends BaseEntity {
  @Column({ type: 'integer', nullable: true })
  display_sequence: number;

  @RelationId((x: VoterZones) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @RelationId((x: VoterZones) => x.voter)
  voter_id: number;

  @ManyToOne(() => Voters, { nullable: true })
  @JoinColumn({ name: 'voter_id' })
  voter: Voters;

  @RelationId((x: VoterZones) => x.data_repository)
  data_repo_id: number;

  @ManyToOne(() => Data_Repos, { nullable: true })
  @JoinColumn({ name: 'data_repo_id' })
  data_repository: Data_Repos;
} 