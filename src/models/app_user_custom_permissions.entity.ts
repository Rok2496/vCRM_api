import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Permissions } from './app_permissions.entity';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_USER_CUSTOM_PERMISSIONS })
export class App_User_Custom_Permissions extends BaseEntity {
  @RelationId((x: App_User_Custom_Permissions) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.app_user_custom_permissions)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: App_User_Custom_Permissions) => x.permission)
  permission_id: number;

  @ManyToOne(() => App_Permissions, (x) => x.app_user_custom_permissions)
  @JoinColumn({ name: 'permission_id' })
  permission: App_Permissions;

  @Column({ type: 'varchar', nullable: true }) // -- e.g., Read, Write, Update, Delete
  access_level: string;

  @Column({ type: 'timestamp' })
  assigned_date: Date;
}
