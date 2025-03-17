import { ENTITY_NAME } from 'src/common/constant';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Master_Countries } from './master_countries.entity';
import { Master_Counties } from './master_counties.entity';
import { Master_States } from './master_states.entity';
import { Master_Zone_Types } from './master_zone_types.entity';
import { Zone_Account_Teams } from './zone_account_teams.entity';
import { Zone_Area_By_Zipcodes } from './zone_area_by_zipcodes.entity';
import { Zone_Companies } from './zone_companies.entity';
import { Zone_Contacts } from './zone_contacts.entity';

@Entity({ name: ENTITY_NAME.ZONES })
export class Zones extends BaseEntity {
  @Column({ type: 'varchar', length: 256 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'boolean' })
  has_parent_zone: boolean;

  @Column({ nullable: true, type: 'decimal', precision: 18, scale: 2 })
  latitude: number;

  @Column({ nullable: true, type: 'decimal', precision: 18, scale: 2 })
  longitude: number;

  @Column({ nullable: true, type: 'varchar', length: 1500 })
  office_address: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  elected_official_name: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  elected_official_title: string;

  @Column({ nullable: true, type: 'varchar', length: 50 })
  phone: string;

  @Column({ nullable: true, type: 'varchar', length: 256 })
  email: string;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  website: string;

  @Column({ nullable: true, type: 'int' })
  sequence: number;

  @Column({ nullable: true, type: 'int' })
  population_stats: number;

  @Column({ nullable: true, type: 'int' })
  contact_stats: number;

  @Column({ nullable: true, type: 'int' })
  business_stats: number;

  @Column({ nullable: true, type: 'int' })
  democrates_voter_stats: number;

  @Column({ nullable: true, type: 'int' })
  republican_voter_stats: number;

  @Column({ nullable: true, type: 'int' })
  independent_voter_stats: number;

  @Column({ nullable: true, type: 'int' })
  active_voter_stats: number;

  @Column({ nullable: true, type: 'varchar', length: 1024 })
  zone_image: string;

  @RelationId((x: Zones) => x.country)
  country_id: number;

  @ManyToOne(() => Master_Countries, (x) => x.zones, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country: Master_Countries;

  @RelationId((x: Zones) => x.state)
  state_id: number;

  @ManyToOne(() => Master_States, (x) => x.zones, { nullable: true })
  @JoinColumn({ name: 'state_id' })
  state: Master_States;

  @RelationId((x: Zones) => x.county)
  county_id: number;

  @ManyToOne(() => Master_Counties, (x) => x.zones, { nullable: true })
  @JoinColumn({ name: 'county_id' })
  county: Master_Counties;

  @RelationId((x: Zones) => x.zone_type)
  zone_type_id: number;

  @ManyToOne(() => Master_Zone_Types, (x) => x.zones, { nullable: true })
  @JoinColumn({ name: 'zone_type_id' })
  zone_type: Master_Zone_Types;

  @RelationId((x: Zones) => x.manager_employee)
  manager_employee_id: number;

  @ManyToOne(() => Employees, (x) => x.manager_employee_zones, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_employee_id' })
  manager_employee: Employees;

  @RelationId((x: Zones) => x.parent_zone)
  parent_zone_id: number;

  @ManyToOne(() => Zones, (x) => x.child_zones, { nullable: true })
  @JoinColumn({ name: 'parent_zone_id' })
  parent_zone: Zones;

  @OneToMany(() => Zones, (x) => x.parent_zone)
  child_zones: Zones[];

  // Other Relations:
  @OneToMany(() => Zone_Area_By_Zipcodes, (x) => x.zone)
  zone_area_by_zipcodes: Zone_Area_By_Zipcodes[];

  @OneToMany(() => Zone_Account_Teams, (x) => x.zone)
  zone_account_teams: Zone_Account_Teams[];

  @OneToMany(() => Zone_Companies, (x) => x.zone)
  zone_companies: Zone_Companies[];

  @OneToMany(() => Zone_Contacts, (x) => x.zone)
  zone_contacts: Zone_Contacts[];

  @OneToMany(() => App_Users, (x) => x.zone)
  app_users: App_Users[];
}
