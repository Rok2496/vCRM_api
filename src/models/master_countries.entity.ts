import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Companies } from './companies.entity';
import { Contacts } from './contacts.entity';
import { Employees } from './employees.entity';
import { Master_Cities } from './master_cities.entity';
import { Master_Counties } from './master_counties.entity';
import { Master_States } from './master_states.entity';
import { Master_Zip_Codes } from './master_zip_codes.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.MASTER_COUNTRY })
export class Master_Countries extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  ticker: string;

  @Column({ nullable: true, type: 'varchar', length: 128 })
  flag_icon: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  phone_code: string;

  // External Relations:
  @OneToMany(() => Master_States, (state) => state.master_country)
  master_states: Master_States[];

  @OneToMany(() => Master_Counties, (county) => county.master_country)
  master_counties: Master_Counties[];

  @OneToMany(() => Master_Cities, (city) => city.master_country)
  master_cities: Master_Cities[];

  @OneToMany(() => Master_Zip_Codes, (zip_code) => zip_code.master_country)
  master_zip_codes: Master_Zip_Codes[];

  @OneToMany(() => Employees, (x) => x.country)
  employees: Employees[];

  @OneToMany(() => Companies, (x) => x.country)
  companies: Companies[];

  @OneToMany(() => Contacts, (x) => x.country)
  contacts: Contacts[];

  @OneToMany(() => Zones, (x) => x.country)
  zones: Zones[];

  @OneToMany(() => App_Users, (x) => x.master_country)
  app_users: App_Users[];
}
