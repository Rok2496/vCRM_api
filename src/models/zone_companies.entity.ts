import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.ZONE_COMPANIES })
export class Zone_Companies extends BaseEntity {
  @Column({ nullable: true, type: 'varchar', length: 128 })
  city_name: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  zip_code: string;

  @Column({ nullable: true, type: 'int' })
  display_score: number;

  @RelationId((x: Zone_Companies) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, (x) => x.zone_companies, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @RelationId((x: Zone_Companies) => x.company)
  company_id: number;

  @ManyToOne(() => Companies, (x) => x.zone_companies, { nullable: true })
  @JoinColumn({ name: 'company_id' })
  company: Companies;
}
