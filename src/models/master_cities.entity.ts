import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Master_Counties } from './master_counties.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_States } from './master_states.entity';

@Entity({ name: ENTITY_NAME.MASTER_CITY })
export class Master_Cities extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @RelationId((x: Master_Cities) => x.master_country)
  master_country_id: number;

  @RelationId((x: Master_Cities) => x.master_state)
  master_state_id: number;

  @RelationId((x: Master_Cities) => x.master_county)
  master_county_id: number;

  @ManyToOne(() => Master_Countries, (country) => country.master_cities, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_country_id' })
  master_country: Master_Countries;

  @ManyToOne(() => Master_States, (state) => state.master_cities, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_state_id' })
  master_state: Master_States;

  @ManyToOne(() => Master_Counties, (county) => county.master_cities, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_county_id' })
  master_county: Master_Counties;
}
