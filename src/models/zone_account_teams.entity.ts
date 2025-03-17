import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.ZONE_ACCOUNT_TEAMS })
export class Zone_Account_Teams extends BaseEntity {
  @Column({ nullable: true, type: 'varchar', length: 1028 })
  name: string;

  @Column({ type: 'boolean' })
  primary_manager: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  start_date: Date;

  @Column({ nullable: true, type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'boolean' })
  live_or_planning: boolean;

  @RelationId((x: Zone_Account_Teams) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, (x) => x.zone_account_teams, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @RelationId((x: Zone_Account_Teams) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.zone_account_teams, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: Zone_Account_Teams) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.zone_account_teams, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
}
