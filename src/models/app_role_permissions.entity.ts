import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Features } from './app_features.entity';
import { App_Permissions } from './app_permissions.entity';
import { App_Roles } from './app_roles.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_ROLE_PERMISSIONS })
export class App_Role_permissions extends BaseEntity {
  @RelationId((x: App_Role_permissions) => x.role)
  role_id: number;

  @ManyToOne(() => App_Roles, (x) => x.app_role_permissions)
  @JoinColumn({ name: 'role_id' })
  role: App_Roles;

  @RelationId((x: App_Role_permissions) => x.feature)
  feature_id: number;

  @ManyToOne(() => App_Features, (x) => x.app_role_permissions)
  @JoinColumn({ name: 'feature_id' })
  feature: App_Features;
  
  @Column({ type: 'boolean', default: false })
  can_view: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_edit: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_delete: boolean;
  
  @Column({ type: 'boolean', default: false })
  can_approve: boolean;
}
