import { ENTITY_NAME } from 'src/common/constant';

import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

import { App_Users } from './app_users.entity';

import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_USER_OTPS })
export class App_User_Otps extends BaseEntity {
  @Column({ type: 'varchar', length: 6 })
  otp: string;

  @Column({ type: 'timestamp' })
  expiry_time: Date;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;

  @Column({ type: 'int', default: 0 })
  resend_attempts: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  created_by: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updated_by: string;

  @RelationId((x: App_User_Otps) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.app_user_otps)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;
}
