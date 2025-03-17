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
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';
import { Employees } from './employees.entity';
import { Master_Cities } from './master_cities.entity';
import { Master_Counties } from './master_counties.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_Zip_Codes } from './master_zip_codes.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.MASTER_STATE })
export class Master_States extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  ticker: string;

  @RelationId((x: Master_States) => x.master_country)
  master_country_id: number;

  @ManyToOne(() => Master_Countries, (country) => country.master_states)
  @JoinColumn({ name: 'master_country_id' })
  master_country: Master_Countries;

  // Other Relations
  @OneToMany(() => Master_Cities, (city) => city.master_state)
  master_cities: Master_Cities[];

  @OneToMany(() => Master_Counties, (county) => county.master_state)
  master_counties: Master_Counties[];

  @OneToMany(() => Master_Zip_Codes, (zip_code) => zip_code.master_state)
  master_zip_codes: Master_Zip_Codes[];

  @OneToMany(() => Employees, (x) => x.state)
  employees: Employees[];

  @OneToMany(() => Companies, (x) => x.state)
  companies: Companies[];

  @OneToMany(() => Contacts, (x) => x.state)
  contacts: Contacts[];

  @OneToMany(() => Zones, (x) => x.state)
  zones: Zones[];
}
