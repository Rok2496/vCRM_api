import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { App_Role_permissions } from './app_role_permissions.entity';
import { App_User_Roles } from './app_user_roles.entity';
import { App_Users } from './app_users.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_ROLES })
export class App_Roles extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  // External Relations
  @OneToMany(() => App_User_Roles, (x) => x.role)
  app_user_roles: App_User_Roles[];

  @OneToMany(() => App_Role_permissions, (x) => x.role)
  app_role_permissions: App_Role_permissions[];

  /* 
  // NOTE: (ID: 01) Reaction
  @OneToMany(() => App_Users, (x) => x.role)
  app_users: App_Users[]; 
  */

  @OneToMany(() => App_Users, (x) => x.primary_role)
  app_users: App_Users[];
}
