import { ENTITY_NAME } from 'src/common/constant';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { App_Role_Menu_Access } from './app_role_menu_access.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: ENTITY_NAME.APP_MENU_ITEMS })
export class App_Menu_Items extends BaseEntity {
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Column({ type: 'varchar', length: 256 })
  url: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  icon: string;

  @Column({ nullable: true })
  parent_id: number;

  @ManyToOne(() => App_Menu_Items, (menu) => menu.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent: App_Menu_Items;

  @OneToMany(() => App_Menu_Items, (menu) => menu.parent)
  children: App_Menu_Items[];

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  // External Relations
  @OneToMany(() => App_Role_Menu_Access, (x) => x.menu_item)
  app_role_menu_access: App_Role_Menu_Access[];
} 