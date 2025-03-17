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
import { Master_Cities } from './master_cities.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_States } from './master_states.entity';
import { Master_Zip_Codes } from './master_zip_codes.entity';

@Entity({ name: ENTITY_NAME.MASTER_COUNTY })
export class Master_Counties extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @RelationId((x: Master_Counties) => x.master_country)
  master_country_id: number;

  @RelationId((x: Master_Counties) => x.master_state)
  master_state_id: number;

  @ManyToOne(() => Master_Countries, (country) => country.master_counties, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_country_id' })
  master_country: Master_Countries;

  @ManyToOne(() => Master_States, (state) => state.master_counties, {
    nullable: true,
  })
  @JoinColumn({ name: 'master_state_id' })
  master_state: Master_States;

  // External Relations
  @OneToMany(() => Master_Cities, (city) => city.master_county)
  master_cities: Master_Cities[];

  @OneToMany(() => Master_Zip_Codes, (zip_code) => zip_code.master_county)
  master_zip_codes: Master_Zip_Codes[];
}
