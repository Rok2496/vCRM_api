import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Contacts } from './contacts.entity';
import { Data_Repos } from './data_repos.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.ZONE_CONTACTS })
export class Zone_Contacts extends BaseEntity {
  @RelationId((x: Zone_Contacts) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, (x) => x.zone_contacts, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @Column({ nullable: true, type: 'int' })
  display_score: number;

  @RelationId((x: Zone_Contacts) => x.contact)
  contact_id: number;

  @ManyToOne(() => Contacts, (x) => x.zone_contacts, { nullable: true })
  @JoinColumn({ name: 'contact_id' })
  contact: Contacts;

  @RelationId((x: Zone_Contacts) => x.data_repository)
  data_repo_id: number;

  @ManyToOne(() => Data_Repos, { nullable: true })
  @JoinColumn({ name: 'data_repo_id' })
  data_repository: Data_Repos;
}
