import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, OneToMany } from 'typeorm';
import { App_Role_permissions } from './app_role_permissions.entity';
import { App_User_Custom_Permissions } from './app_user_custom_permissions.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_FEATURES })
export class App_Features extends BaseEntity {
  @Column({ type: 'varchar', length: 128, unique: true })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  // External Relations
  @OneToMany(() => App_Role_permissions, (x) => x.feature)
  app_role_permissions: App_Role_permissions[];

  @OneToMany(() => App_User_Custom_Permissions, (x) => x.feature)
  app_user_custom_permissions: App_User_Custom_Permissions[];
} 