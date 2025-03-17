import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';
import { Employees } from './employees.entity';

@Entity({ name: ENTITY_NAME.EMPLOYEE_ATTENDANCES })
export class Employee_Attendances extends BaseEntity {
  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  actual_check_in_time: string;

  @Column({ type: 'time', nullable: true })
  actual_check_out_time: string;

  @Column({ type: 'boolean' })
  onsite_or_remote: boolean;

  @Column({ type: 'text', nullable: true })
  actual_work_details: string;

  @Column({ type: 'boolean' })
  manager_approval_status: boolean;

  @Column({ type: 'text', nullable: true })
  manager_approval_remarks: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  check_in_ip: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  check_out_ip: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  check_in_device_id: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  check_out_device_id: string;

  @RelationId((x: Employee_Attendances) => x.manager_approval_user)
  manager_approval_user_id: number;

  @ManyToOne(() => App_Users, (x) => x.manager_approval_employee_attendances, {
    nullable: true,
  })
  @JoinColumn({ name: 'manager_approval_user_id' })
  manager_approval_user: App_Users;

  @RelationId((x: Employee_Attendances) => x.employee)
  employee_id: number;

  @ManyToOne(() => Employees, (x) => x.employee_attendances)
  @JoinColumn({ name: 'employee_id' })
  employee: Employees;
}
