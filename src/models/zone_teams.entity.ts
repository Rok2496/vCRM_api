import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';
import { Zones } from './zones.entity';

@Entity({ name: ENTITY_NAME.ZONE_TEAMS })
export class Zone_Teams extends BaseEntity {
  @Column({ nullable: true, type: 'varchar', length: 1028 })
  name: string;

  @Column({ type: 'boolean' })
  primary_manager: boolean;

  @Column({ nullable: true, type: 'timestamp' })
  start_date: Date;

  @Column({ nullable: true, type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'boolean' })
  Active_or_former: boolean;

  @RelationId((x: Zone_Teams) => x.zone)
  zone_id: number;

  @ManyToOne(() => Zones, { nullable: true })
  @JoinColumn({ name: 'zone_id' })
  zone: Zones;

  @RelationId((x: Zone_Teams) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: Zone_Teams) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, { nullable: true })
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
} 