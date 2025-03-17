import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Features } from './app_features.entity';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_USER_CUSTOM_PERMISSIONS })
export class App_User_Custom_Permissions extends BaseEntity {
  @RelationId((x: App_User_Custom_Permissions) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.app_user_custom_permissions)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: App_User_Custom_Permissions) => x.feature)
  feature_id: number;

  @ManyToOne(() => App_Features, (x) => x.app_user_custom_permissions)
  @JoinColumn({ name: 'feature_id' })
  feature: App_Features;

  @Column({ type: 'varchar', length: 50 })
  access_level: string;

  @Column({ type: 'timestamp' })
  assigned_date: Date;
}
