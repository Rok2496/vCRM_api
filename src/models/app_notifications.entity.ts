import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_NOTIFICATIONS })
export class App_Notifications extends BaseEntity {
  @RelationId((x: App_Notifications) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.app_notifications)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @Column({ type: 'varchar', length: 256 })
  title: string;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'boolean' })
  is_read: boolean;
}
