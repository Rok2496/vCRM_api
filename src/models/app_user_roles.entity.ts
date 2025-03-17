import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Roles } from './app_roles.entity';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_USER_ROLES })
export class App_User_Roles extends BaseEntity {
  @RelationId((x: App_User_Roles) => x.user)
  user_id: number;

  @ManyToOne(() => App_Users, (x) => x.app_user_roles)
  @JoinColumn({ name: 'user_id' })
  user: App_Users;

  @RelationId((x: App_User_Roles) => x.role)
  role_id: number;

  @ManyToOne(() => App_Roles, (x) => x.app_user_roles)
  @JoinColumn({ name: 'role_id' })
  role: App_Roles;

  @Column({ type: 'timestamp' })
  assigned_date: Date;
}
