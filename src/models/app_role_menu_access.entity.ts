import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { App_Menu_Items } from './app_menu_items.entity';
import { App_Roles } from './app_roles.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_ROLE_MENU_ACCESS })
export class App_Role_Menu_Access extends BaseEntity {
  @RelationId((x: App_Role_Menu_Access) => x.role)
  role_id: number;

  @ManyToOne(() => App_Roles, (x) => x.app_role_menu_access)
  @JoinColumn({ name: 'role_id' })
  role: App_Roles;

  @RelationId((x: App_Role_Menu_Access) => x.menu_item)
  menu_item_id: number;

  @ManyToOne(() => App_Menu_Items, (x) => x.app_role_menu_access)
  @JoinColumn({ name: 'menu_item_id' })
  menu_item: App_Menu_Items;

  @Column({ type: 'boolean', default: true })
  is_visible: boolean;
} 